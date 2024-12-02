import * as novel from '@novel/next/sdk';
import { LOCALES } from 'app/constants';

import CallToActionEnding from './components/call-to-action/ending';
import FaqsAccordion from './components/faqs/accordion';
import FeatureFocus from './components/features/focus';
import FeatureIntegrations from './components/features/integrations';
import HeroCenterVariant from './components/hero/center';
import PricingTable from './components/pricing/table';
import TestimonialMasonry from './components/testimonial/masonry';
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
				<FaqsAccordion/>s
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
	try {
		const response = await novel.rpc.SubscriptionsPlans();
		if (response.ok) {
			const { plans } = await response.json();
			return plans;
		}
	} catch {}
	return [];
}

/**
 * This is an example of adding custom localization for a specific route
 * available as a statically generated page.
 */
export async function generateStaticParams () {
	return LOCALES.locales.map((locale) => ({ locale }));
}

/**
 * Remove this if you want to use SSG for this page.
 *
 * We are keeping this in the marketing pages to ensure that they are always static.
 */
export const dynamic = 'force-static';
