import * as novel from 'packages/novel/sdk';

import CallToActionEnding from '../components/call-to-action/ending';
import FaqsAccordion from '../components/faqs/accordion';
import PricingComparison from '../components/pricing/comparison';
import PricingTable from '../components/pricing/table';
import Footer from '../footer';
import Header from '../header';

export default async function Page () {
	const plans = await getPage();
	return (
		<>
			<Header/>
			<main className="flex flex-col gap-10 md:gap-20 pt-10">
				<PricingTable plans={plans}/>
				<PricingComparison/>
				<FaqsAccordion/>
				<CallToActionEnding/>
			</main>
			<Footer/>
		</>
	);
}

/**
 * This is an example of adding a hydration function to the marketing page
 */
async function getPage () {
	try {
		const response = await novel.rpc.SubscriptionsPlans();
		if (response.ok) {
			const { plans } = await response.json();
			return plans;
		}
	} catch {
		return [];
	}
}

/**
 * Remove this if you want to use SSG for this page.
 *
 * We are keeping this in the marketing pages to ensure that they are always static.
 */
export const dynamic = 'force-static';
