import CallToActionEnding from 'components/marketing/call-to-action/ending';
import FaqsAccordion from 'components/marketing/faqs/accordion';
import FeatureFocus from 'components/marketing/features/focus';
import FeatureIntegrations from 'components/marketing/features/integrations';
import HeroCenterVariant from 'components/marketing/hero/center';
import PricingTable from 'components/marketing/pricing/table';
import TestimonialMasonry from 'components/marketing/testimonial/masonry';
import * as novel from 'novel/sdk';

import Footer from './footer';
import Header from './header';

/**
 * WARNING
 *
 * Always be careful adding dynamic data to your marketing pages. This can lead to these
 * pages being opted out of SSG which can lead to performance issues with lighthouse scores.
 */
export default async function Home () {
	const plans = await getPage();
	return (
		<>
			<Header/>
			<main className="flex flex-col gap-10 md:gap-20">
				<HeroCenterVariant />
				<FeatureFocus />
				<FeatureIntegrations />
				<PricingTable plans={plans} />
				<TestimonialMasonry />
				<FaqsAccordion/>
				<CallToActionEnding />
			</main>
			<Footer/>
		</>
	);
}

/**
 * This is an example of adding a hydration function to the marketing page
 */
async function getPage () {
	const response = await novel.rpc.SubscriptionsPlans();
	if (response.ok) {
		const { plans } = await response.json();
		return plans;
	}
}

/**
 * Remove this if you want to use SSG for this page.
 *
 * We are keeping this in the marketing pages to ensure that they are always static.
 */
export const dynamic = 'force-static';
