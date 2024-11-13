import CallToActionEnding from '../components/call-to-action/ending';
import FeatureFocus from '../components/features/focus';
import FeatureIntegrations from '../components/features/integrations';
import Footer from '../footer';
import Header from '../header';

export default async function Page () {
	return (
		<>
			<Header/>
			<main className="flex flex-col gap-10 md:gap-20">
				<FeatureFocus/>
				<FeatureIntegrations/>
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
