import { HOST } from 'app/constants';
import glob from 'fast-glob';
import merge from 'lodash.merge';
import path from 'path';

export default function robots (callback) {
	return async function () {
		const marketing = glob.sync([path.resolve(process.cwd(), 'app/\\(marketing\\)/**/page.tsx')]);
		const app = glob.sync([path.resolve(process.cwd(), 'app/\\(app\\)/**/page.tsx')]);
		const allows = [];
		const disallows = [];
		marketing.forEach((file) => {
			if (!file.includes('/login/')) {
				allows.push('/' + file.replace(process.cwd(), '').replace('/app/(marketing)/', '').replace('page.tsx', ''));
			} else {
				disallows.push('/' + file.replace(process.cwd(), '').replace('/app/(marketing)/', '').replace('page.tsx', ''));
			}
		});
		app.forEach((file) => {
			disallows.push('/' + file.replace(process.cwd(), '').replace('/app/(app)/', '').replace('page.tsx', ''));
		});
		let override = { rules: [] };
		if (typeof callback === 'function' || callback[Symbol.toStringTag] === 'AsyncFunction') {
			override = await callback();
		}
		return merge(override, {
			rules: [
				{
					userAgent: '*',
					allow: allows,
					disallow: disallows,
				},
				...(override?.rules ?? []),
			],
			sitemap: `${HOST}/sitemap.xml`,
		});
	};
}
