'use client';

import Button from 'components/elements/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from 'components/ui/dialog';
import format from 'date-fns/format';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import * as novel from 'novel/sdk';
import { useState } from 'react';

import AlertOk from '@/components/elements/alerts/ok';

export default function Current ({ current }) {
	const query = useSearchParams();
	const router = useRouter();
	const [isWorking, working] = useState(false);

	async function cancel () {
		working(true);
		await novel.rpc.SubscriptionsCancel();
		router.refresh();
	}

	return (
		<>
			{query.has('subscribed') && (
				<div className="w-full md:w-2/3">
					<AlertOk title="Subscription succesful">
						You have successfully subscribed to a new plan. You may continue to use the features available to you with this new subscription.
					</AlertOk>
				</div>
			)}
			<section className="section">
				{current.subscribed && (
					<div className="flex flex-col gap-5">
						<div>
							<div className="flex items-center justify-between gap-2">
								<div className="flex-1">
									<h3 className="text-2xl font-medium">{current.subscription.name}</h3>
									<p className="text-muted-foreground capitalize">{current.subscription.status}</p>
								</div>
								<Link href="/organization/subscribe" className="button">Change Plan</Link>
								{current.subscription.status !== 'cancelled' && (
									<Dialog>
										<DialogTrigger asChild>
											<button className="button outline">Cancel</button>
										</DialogTrigger>
										<DialogContent className="sm:max-w-[520px]">
											<DialogHeader>
												<DialogTitle>Are you sure you want to cancel your subscription?</DialogTitle>
												<DialogDescription>
													You are about to cancel your subscription. You will have access to your subscription until the period for it ends. Are you sure you want to continue?
												</DialogDescription>
											</DialogHeader>
											<DialogFooter>
												<DialogClose asChild>
													<Button variant="outline">Cancel</Button>
												</DialogClose>
												<Button working={isWorking} variant="destructive" onClick={() => cancel()}>Yes, Cancel my Subscription</Button>
											</DialogFooter>
										</DialogContent>
									</Dialog>
								)}
							</div>
							{current.subscription.status === 'cancelled' && (
								<p>You have cancelled your subscription but you still have access until <span className="underline underline-offset-2">{format(new Date(current.subscription.period_end), 'MMM dd, yyyy')}</span></p>
							)}
							{current.subscription.status !== 'cancelled' && (
								<p>Your subscription will renew on <span className="underline underline-offset-2">{format(new Date(current.subscription.renews_at), 'MMM dd, yyyy')}</span></p>
							)}
						</div>
						<div className="flex items-start divide-x divide-border">
							{Object.keys(current.quotas).map((quota) => (
								<div key={quota} className="first:pl-0 px-10">
									<div className="capitalize">{quota}</div>
									<div className="font-medium text-2xl">{current.quotas[quota]}</div>
								</div>
							))}
						</div>
					</div>
				)}
				{!current.subscribed && (
					<div className="flex flex-col gap-5">
						<div>
							<div className="flex items-center justify-between gap-2">
								<div className="flex-1">
									<h3 className="text-2xl font-medium">No Subscription</h3>
								</div>
								<Link href="/organization/subscribe" className="button">Change Plan</Link>
							</div>
						</div>
					</div>
				)}
			</section>
		</>
	);
}
