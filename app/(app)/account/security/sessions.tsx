'use client';

import * as novel from '@novel/next/sdk';
import Button from 'components/elements/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from 'components/ui/dialog';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { LaptopIcon, PhoneIcon } from 'lucide-react';

export default function Sessions ({ sessions }) {
	async function logout (session_id) {
		const response = await novel.rpc.AccountSessionsRevoke({ session_id });
		if (response.ok) {
			window.location.reload();
		}
	}

	return (
		<section className="section">
			<header>
				<div className="flex gap-2 items-center">
					<h3 className="text-xl font-medium">Sessions</h3>
				</div>
				<p className="text-muted-foreground">Places where you're logged in.</p>
			</header>
			<div>
				<table className="min-w-full divide-y divide-border">
					<thead>
						<tr>
							<th className="w-12 py-3.5 pl-4 pr-3 text-center text-sm font-medium sm:pl-0">Type</th>
							<th className="px-3 py-3.5 text-left text-sm font-medium">Device</th>
							<th className="px-3 py-3.5 text-left text-sm font-medium">From</th>
							<th/>
						</tr>
					</thead>
					<tbody className="divide-y divide-border text-sm">
						{sessions.map(session => (
							<tr key={session.session_id}>
								<td className="flex items-center justify-center py-2 pl-4 pr-3 sm:pl-0">
									{session.useragent.mobile && <PhoneIcon />}
									{!session.useragent.mobile && <LaptopIcon />}
								</td>
								<td className="whitespace-nowrap px-3 py-2 w-full">
									<div className="font-medium">{session.useragent.os} / {session.useragent.browser}</div>
									{session.country ?? 'Unknown'} &middot; {session.ip}
								</td>
								<td className="whitespace-nowrap px-3 py-2">
									{session.started_at && formatDistanceToNow(new Date(session.started_at))}
								</td>
								<td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right sm:pr-0">
									{!session.expired && (
										<Dialog>
											<DialogTrigger asChild>
												<button className="button outline xs">Revoke</button>
											</DialogTrigger>
											<DialogContent className="sm:max-w-[520px]">
												<DialogHeader>
													<DialogTitle>Are you sure you want to revoke this session?</DialogTitle>
													<DialogDescription>
														You are about to log out one of your sessions. Please confirm this action.
													</DialogDescription>
												</DialogHeader>
												<DialogFooter>
													<DialogClose asChild>
														<Button variant="outline">Cancel</Button>
													</DialogClose>
													<Button onClick={() => logout(session.session_id)}>Yes, Log me out</Button>
												</DialogFooter>
											</DialogContent>
										</Dialog>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
}
