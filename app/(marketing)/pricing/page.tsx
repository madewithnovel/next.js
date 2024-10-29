import CallToActionEnding from 'components/marketing/call-to-action/ending';
import FaqsAccordion from 'components/marketing/faqs/accordion';
import PricingComparison from 'components/marketing/pricing/compare';
import PricingTableStandard from 'components/marketing/pricing/table';

import Footer from '../footer';
import Header from '../header';

export default async function Page () {
	return (
		<>
			<Header/>
			<main className="flex flex-col gap-10 md:gap-20">
				<PricingTableStandard/>
				<PricingComparison/>
				<FaqsAccordion/>
				<CallToActionEnding/>
			</main>
			<Footer/>
		</>
	);
}

/**
 * Remove this if you want to use SSG for this page.
 *
 * We are keeping this in the marketing pages to ensure that they are always static.
 */
export const dynamic = 'force-static';
