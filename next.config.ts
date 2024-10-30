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
	i18n,
	eslint: {
		/**
		 * Allow production builds to successfully complete even
		 * if your project has lint errors and warnings.
 		 */
		ignoreDuringBuilds: true,
	},
	typescript: {
		/**
		 * WARNING
		 *
		 * Dangerously allow production builds to successfully
		 * complete even if your project has typescript errors.
		 */
		ignoreBuildErrors: true,
	},
	/**
	 * Add your custom Next.js configuration here
	 */
});
