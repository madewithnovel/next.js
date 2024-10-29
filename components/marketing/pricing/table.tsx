'use client';

import Toggle from 'components/elements/toggle';
import { CheckIcon, MinusIcon } from 'lucide-react';
import Link from 'next/link';
import * as novel from 'novel/sdk';
import { useEffect, useState } from 'react';

export default function PricingTableStandard (props) {
	const { plans: hydratedPlans } = props;
	const [plans, setPlans] = useState(hydratedPlans);
	const [yearly, setMonthly] = useState(true);
	const currency = 'USD';

	useEffect(() => {
		(async () => {
			if (!plans) {
				const response = await novel.request.get('/api/v1/plans');
				const { plans } = await response.json();
				setPlans(plans);
			}
		})();
	}, []);

	return (
		<div className="container mx-auto px-5 md:px-10">
			<div className="flex items-center justify-center gap-5 py-5">
				<div>Monthly</div>
				<Toggle checked={yearly} onChange={(e) => setMonthly(e.target.value)}/>
				<div>Yearly</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-1" style={{ minHeight: 583 }}>
				<div className="bg-stone-100 rounded-xl md:rounded-none md:rounded-l-xl flex flex-col divide-y divide-stone-200">
					<div className="p-10 flex flex-col gap-10">
						<div>
							<div className="text-4xl font-medium">{plans?.[0].name}</div>
							<div>Everything you need to run a modern service business</div>
						</div>
						<div>
							<div className="flex items-center">
								<div className="text-4xl">${Math.ceil(Number(yearly ? plans?.[0].yearly[currency] / 12 : plans?.[0].monthly[currency]))}</div>
								<div className="text-xl">/month</div>
							</div>
							<div
								className="text-sm text-stone-600">{yearly ? `Billed $${plans?.[0].yearly[currency]} yearly. Saves $${(plans?.[0].monthly[currency] * 12) - plans?.[0].yearly[currency]}` : `Total of $${plans?.[0].monthly[currency] * 12} in a year`}</div>
						</div>
						<Link href={`/start?plan=${plans?.[0].id}`} className="button action w-full">Try for free</Link>
						<div className="flex flex-col gap-2">
							<div className="font-medium">Users and Workspaces</div>
							<div className="text-sm">
								<CheckIcon className="inline-flex" size={18}/> Unlimited workspaces
							</div>
							<div className="text-sm">
								<CheckIcon className="inline-flex" size={18}/> Unlimited chats
							</div>
							<div className="text-sm text-stone-300">
								<MinusIcon className="inline-flex" size={18}/> Up to 100 team members.
							</div>
							<div className="text-sm text-stone-300">
								<MinusIcon className="inline-flex" size={18}/> Notifications
							</div>
							<div className="text-sm text-stone-300">
								<MinusIcon className="inline-flex" size={18}/> Workflows
							</div>
							<div className="text-sm text-stone-300">
								<MinusIcon className="inline-flex" size={18}/> Workspace Management
							</div>
						</div>
					</div>
				</div>
				<div className="bg-stone-100 rounded-xl md:rounded-none  flex flex-col divide-y divide-stone-200">
					<div className="p-10 flex flex-col gap-10">
						<div>
							<div className="text-4xl font-medium">{plans?.[1].name}</div>
							<div>Level up with more clients, custom domains, automations, and apps</div>
						</div>
						<div>
							<div className="flex items-center">
								<div className="text-4xl">${Math.ceil(Number(yearly ? plans?.[1].yearly[currency] / 12 : plans?.[1].monthly[currency]))}</div>
								<div className="text-xl">/month</div>
							</div>
							<div className="text-sm text-stone-600">{yearly ? `Billed $${plans?.[1].yearly[currency]} yearly. Saves $${(plans?.[1].monthly[currency] * 12) - plans?.[1].yearly[currency]}` : `Total of $${plans?.[1].monthly[currency] * 12} in a year`}</div>
						</div>
						<Link href={`/start?plan=${plans?.[1].id}`} className="button action w-full">Try for free</Link>
						<div className="flex flex-col gap-2">
							<div className="font-medium">Users and Workspaces</div>
							<div className="text-sm">
								<CheckIcon className="inline-flex" size={18}/> Unlimited workspaces
							</div>
							<div className="text-sm">
								<CheckIcon className="inline-flex" size={18}/> Unlimited chats
							</div>
							<div className="text-sm">
								<CheckIcon className="inline-flex" size={18}/> Up to 100 team members.
							</div>
							<div className="text-sm">
								<CheckIcon className="inline-flex" size={18}/> Notifications
							</div>
							<div className="text-sm text-stone-300">
								<MinusIcon className="inline-flex" size={18}/> Workflows
							</div>
							<div className="text-sm text-stone-300">
								<MinusIcon className="inline-flex" size={18}/> Workspace Management
							</div>
						</div>
					</div>
				</div>
				<div className="bg-stone-700 text-white rounded-xl md:rounded-none md:rounded-r-xl  flex flex-col divide-y divide-stone-200">
					<div className="p-10 flex flex-col gap-10">
						<div>
							<div className="text-4xl font-medium">{plans?.[2].name}</div>
							<div>Get the best with an enterprise-grade solution</div>
						</div>
						<div>
							<div className="flex items-center">
								<div className="text-4xl">Custom Quote</div>
							</div>
							<div className="text-sm text-stone-300">Contact sales for more information
							</div>
						</div>
						<Link href={`/enterprise?plan=${plans?.[2].id}`} className="button action w-full">Set up a demo</Link>
						<div className="flex flex-col gap-2">
							<div className="font-medium">Users and Workspaces</div>
							<div className="text-sm">
								<CheckIcon className="inline-flex" size={18}/> Unlimited workspaces
							</div>
							<div className="text-sm">
								<CheckIcon className="inline-flex" size={18}/> Unlimited chats
							</div>
							<div className="text-sm">
								<CheckIcon className="inline-flex" size={18}/> Up to 100 team members.
							</div>
							<div className="text-sm">
								<CheckIcon className="inline-flex" size={18}/> Notifications
							</div>
							<div className="text-sm">
								<CheckIcon className="inline-flex" size={18}/> Workflows
							</div>
							<div className="text-sm">
								<CheckIcon className="inline-flex" size={18}/> Workspace Management
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
