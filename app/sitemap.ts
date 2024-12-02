import { HOST } from 'app/constants';

export default async function sitemap () {
	// TODO: generate pages in marketing
	return [
		{
			url: HOST,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 1,
		},
	];
}
