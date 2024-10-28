import CallToActionWithPreview from 'components/marketing/call-to-action/with-preview';
import Faqs from 'components/marketing/faqs';
// import PricingTableStandard from 'components/marketing/pricing-table/standard';
import FeaturesFocus from 'components/marketing/features/focus';
import FeaturesHighlights from 'components/marketing/features/highlights';
import FeaturesIntegrations from 'components/marketing/features/integrations';
import FeaturesMetrics from 'components/marketing/features/metrics';
import FeaturesTabbed from 'components/marketing/features/tabbed';
import Hero from 'components/marketing/hero';
import TestimonialMasonry from 'components/marketing/testimonial/masonry';
import TrustHorizontal from 'components/marketing/trust/horizontal';

import Footer from './footer';
import Header from './header';

/**
 * WARNING
 *
 * Always be careful adding dynamic data to your marketing pages. This can lead to these
 * pages being opted out of SSG which can lead to performance issues with lighthouse scores.
 */
export default function Home () {
	return (
		<>
			<Header/>
			<main className="flex flex-col gap-20 py-10 mt-20">
				<Hero/>
				<FeaturesHighlights/>
				<TrustHorizontal/>
				<FeaturesTabbed/>
				<FeaturesMetrics/>
				<FeaturesIntegrations/>
				<FeaturesFocus/>
				<TestimonialMasonry/>
				<Faqs/>
				<CallToActionWithPreview/>
			</main>
			<Footer/>
		</>
	);
}
