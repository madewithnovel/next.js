'use client';

import useSession from '@novel/next/hooks/use-session';
import * as novel from '@novel/next/sdk';
import Button from 'components/elements/button';
import Toggle from 'components/elements/toggle';
import { Card, getCustomerIntent, StripeProvider, useElements, useStripe } from 'components/stripe/checkout';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from 'components/ui/dialog';
import { useEffect, useState } from 'react';

const currency = 'USD';

function Payment ({ children, plan, yearly, paymentMethods }) {
	const [error, setError] = useState(null);
	const [isWorking, working] = useState(false);
	const [newCard, useNewCard] = useState(paymentMethods?.length === 0);
	const session = useSession();
	const stripe = useStripe();
	const elements = useElements();

	async function pay (plan, yearly) {
		try {
			working(true);
			const organization = session.organization;
			let intent;
			let method = null;
			if (newCard) {
				intent = await getCustomerIntent(plan, stripe, elements, organization.id);
				if (intent.error) {
					working(false);
					const error = intent.error;
					setError(error.message);
				}
				method = intent.payment_method;
				intent = intent.id;
			}
			if (!method && paymentMethods.length > 0 && newCard === false) {
				method = paymentMethods[0].id;
			}
			const response = await novel.rpc.SubscriptionsSubscribe({ plan, interval: yearly ? 'year' : 'month', intent, method });
			if (response.ok) {
				window.location.href = `/organization/subscription?subscribed=${plan}`;
			} else {
				working(false);
				const { error } = await response.json();
				setError(error.message);
			}
		} catch (error) {
			setError(error.message);
		}
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				{children}
			</DialogTrigger>
			<DialogContent className="sm:max-w-[520px]">
				<DialogHeader>
					<DialogTitle>Confirm Payment for {plan.name}</DialogTitle>
					<DialogDescription>
						You are about to upgrade your subscription. Please confirm your payment below.
					</DialogDescription>
				</DialogHeader>
				{!newCard && (
					<div className="flex flex-col gap-2 items-center">
						<div className="bg-muted-foreground flex flex-col gap-2 text-muted h-48 w-80 mx-auto p-10 rounded-md">
							<div className="flex-1 capitalize">{paymentMethods[0].card.brand}</div>
							<div className="font-medium"><span className="text-4xl">&middot;&middot;&middot;&middot;{' '}&middot;&middot;&middot;&middot;{' '}&middot;&middot;&middot;&middot;{' '}</span>{paymentMethods[0].card.last4}</div>
							<div className="text-sm">{paymentMethods[0].card.expiry_month} / {paymentMethods[0].card.expiry_year}</div>
						</div>
						<Button variant="outline" size="sm" onClick={() => useNewCard(true)}>Use a different card</Button>
					</div>
				)}
				{newCard && (
					<div>
						<Card className="input"/>
					</div>
				)}
				{error && <div className="text-destructive text-sm text-center">{error}</div>}
				<hr/>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button working={isWorking}
						onClick={() => pay(plan.id, yearly)}>{yearly ? `Billed $${plan.yearly[currency]} today, renews yearly` : `$${plan.monthly[currency]} Today, Total of $${plan.monthly[currency] * 12} in a year`}</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default function PricingTable (props) {
	const { plans: hydratedPlans, current, paymentMethods } = props;
	const [plans, setPlans] = useState(hydratedPlans);
	const [yearly, setMonthly] = useState(true);

	useEffect(() => {
		(async () => {
			if (!plans) {
				const response = await novel.rpc.SubscriptionsPlans();
				const { plans } = await response.json();
				setPlans(plans);
			}
		})();
	}, []);

	return (
		<StripeProvider>
			<div className="container mx-auto px-5 md:px-10">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-1">
					<div className="bg-muted rounded-xl md:rounded-none md:rounded-l-xl flex flex-col divide-y divide-stone-200">
						<div className="p-10 flex flex-col gap-10">
							<div>
								<div className="text-4xl font-medium">{plans?.[0].name}</div>
							</div>
							<div>
								<div className="flex items-center">
									<div className="text-4xl">${Math.ceil(Number(yearly ? plans?.[0].yearly[currency] / 12 : plans?.[0].monthly[currency]))}</div>
									<div className="text-xl">/month</div>
								</div>
								<div
									className="text-sm text-stone-600">{yearly ? `Billed $${plans?.[0].yearly[currency]} yearly. Saves $${(plans?.[0].monthly[currency] * 12) - plans?.[0].yearly[currency]}` : `Total of $${plans?.[0].monthly[currency] * 12} in a year`}</div>
							</div>
							<Payment plan={plans?.[0]} yearly={yearly} paymentMethods={paymentMethods}>
								<Button disabled={current.name === plans?.[0].name && current.status !== 'cancelled'} className="button w-full">{current.name === plans?.[0].name && current.status !== 'cancelled' ? 'Current Plan' : 'Upgrade'}</Button>
							</Payment>
							<div className="h-1"></div>
						</div>
					</div>
					<div className="bg-muted rounded-xl md:rounded-none md:rounded-r-xl flex flex-col divide-y divide-stone-200">
						<div className="p-10 flex flex-col gap-10">
							<div>
								<div className="text-4xl font-medium">{plans?.[1].name}</div>
							</div>
							<div>
								<div className="flex items-center">
									<div className="text-4xl">${Math.ceil(Number(yearly ? plans?.[1].yearly[currency] / 12 : plans?.[1].monthly[currency]))}</div>
									<div className="text-xl">/month</div>
								</div>
								<div className="text-sm text-stone-600">{yearly ? `Billed $${plans?.[1].yearly[currency]} yearly. Saves $${(plans?.[1].monthly[currency] * 12) - plans?.[1].yearly[currency]}` : `Total of $${plans?.[1].monthly[currency] * 12} in a year`}</div>
							</div>
							<div className="flex flex-col">
								<Payment plan={plans?.[1]} yearly={yearly} paymentMethods={paymentMethods}>
									<Button disabled={current.name === plans?.[1].name && current.status !== 'cancelled'} className="button w-full">{current.name === plans?.[1].name && current.status !== 'cancelled' ? 'Current Plan' : 'Upgrade'}</Button>
								</Payment>
								<div className="flex items-center gap-5 mt-5">
									<div>Monthly</div>
									<Toggle checked={yearly} onChange={(e) => setMonthly(e.target.value)}/>
									<div>Yearly</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</StripeProvider>
	);
}
