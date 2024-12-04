import { HOST } from 'app/constants';

export default async function robots () {
	// TODO: generate pages in app
	return {
		rules: [
			{
				userAgent: '*',
				allow: '/',
				disallow: ['/dashboard/', '/account/', '/organization/'],
			},
		],
		sitemap: `${HOST}/sitemap.xml`,
	};
}
