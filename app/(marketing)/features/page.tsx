import CallToActionWithPreview from 'components/call-to-action/with-preview';
import Faqs from 'components/faqs';
import FeaturesHighlights from 'components/features/highlights';
import FeaturesIntegrations from 'components/features/integrations';
import FeaturesTabbed from 'components/features/tabbed';

import Footer from '../footer';
import Header from '../header';

export default async function Page () {
	return (
		<>
			<Header/>
			<main className="flex flex-col gap-20 py-10 mt-40">
				<FeaturesTabbed/>
				<FeaturesIntegrations/>
				<FeaturesHighlights/>
				<Faqs/>
				<CallToActionWithPreview/>
			</main>
			<Footer/>
		</>
	);
}
