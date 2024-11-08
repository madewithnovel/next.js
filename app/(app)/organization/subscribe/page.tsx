import PricingComparison from 'app/(marketing)/components/pricing/comparison';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from 'components/ui/breadcrumb';
import { Separator } from 'components/ui/separator';
import { SidebarTrigger } from 'components/ui/sidebar';
import * as novel from 'novel/sdk';

import PricingTable from './table';

async function getPage () {
	const plans = await novel.rpc.SubscriptionsPlans();
	const subscriptions = await novel.rpc.SubscriptionsCurrent();
	if (subscriptions.ok) {
		const plansData = await plans.json();
		const subscriptionsData = await subscriptions.json();
		return { plans: plansData.plans, ...subscriptionsData };
	}
}

export default async function Page () {
	const { plans, subscription, payment_methods } = await getPage();

	return (
		<main className="flex flex-1 flex-col gap-4 p-4 pt-0">
			<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
				<div className="flex items-center gap-2 px-4 container mx-auto">
					<SidebarTrigger className="-ml-1"/>
					<Separator orientation="vertical" className="mr-2 h-4"/>
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink href="/organization">
									Organization
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:block"/>
							<BreadcrumbItem>
								<BreadcrumbPage>Subscription</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</header>
			<div className="p-4 flex flex-col gap-10 pb-20 container mx-auto">
				<PricingTable plans={plans} current={subscription} paymentMethods={payment_methods}/>
				<PricingComparison/>
			</div>
		</main>
	);
}
