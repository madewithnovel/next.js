import CallToActionWithPreview from 'components/call-to-action/with-preview';
import Faqs from 'components/faqs';
import PricingComparison from 'components/pricing-table/comparison';
import PricingTableStandard from 'components/pricing-table/standard';
import * as novel from 'novel/sdk';

import Footer from '../footer';
import Header from '../header';

export default async function Page () {
	const response = await novel.request.get('/api/v1/plans');
	const { plans } = await response.json();

	return (
		<>
			<Header/>
			<main className="flex flex-col gap-20 py-10">
				<PricingTableStandard plans={plans}/>
				<PricingComparison/>
				<Faqs/>
				<CallToActionWithPreview/>
			</main>
			<Footer/>
		</>
	);
}
