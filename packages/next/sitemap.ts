import { HOST } from 'app/constants';
import glob from 'fast-glob';
import path from 'path';

export default function sitemap (callback) {
	return async function () {
		const marketing = glob.sync([path.resolve(process.cwd(), 'app/\\(marketing\\)/**/page.tsx')]);
		const sitemap = [];
		marketing.forEach((file) => {
			if (!file.includes('/login/')) {
				sitemap.push('/' + file.replace(process.cwd(), '').replace('/app/(marketing)/', '').replace('page.tsx', ''));
			}
		});
		let override = [];
		if (typeof callback === 'function' || callback[Symbol.toStringTag] === 'AsyncFunction') {
			override = await callback();
		}
		return [
			...sitemap.map((url) => ({
				url: HOST + url,
				lastModified: new Date(),
				changeFrequency: 'yearly',
				priority: 1,
			})),
			...override,
		];
	};
}
