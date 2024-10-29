import withNovelConfig from 'novel/next/next.config';

/**
 * This is novel's lightweight i18n implementation. Consult with the
 * documentation for more information.
 *
 * See https://novel.dev/docs/guides/i18n
 */
export const i18n = {
	locales: ['en', 'de'],
	defaultLocale: 'en',
};

export default withNovelConfig({
	novel: {
		title: 'Novel',
		description: 'Delightful and Secure SaaS Starter Kit',
	},
	eslint: {
		/**
		 * WARNING
		 *
		 * Dangerously allow production builds to successfully complete even
		 * if your project has type errors.
 		 */
		ignoreDuringBuilds: true,
	},
	i18n,
	/**
	 * Add your custom Next.js configuration here
	 */
});
