'use strict';

/**
 * @param overrides {import('postcss-load-config').Config}
 * @returns {import('postcss-load-config').Config}
 */
module.exports = function withNovelPostCSSDefaults (overrides) {
	return {
		plugins: {
			'postcss-import': {},
			'@tailwindcss/nesting': {},
			tailwindcss: {
				content: [
					'app/**/*.{js,jsx,ts,tsx}',
					'components/**/*.{js,jsx,ts,tsx}',
					'packages/**/*.{js,jsx,ts,tsx}',
					'!**/node_modules/**/*.{js,jsx,ts,tsx}',
				],
				theme: {
					extend: {
						colors: {
							background: "var(--background)",
							foreground: "var(--foreground)",
						},
					},
				},
				plugins: [
					require('@tailwindcss/forms'),
					require('@tailwindcss/typography'),
					require('@headlessui/tailwindcss')({ prefix: 'ui' }),
				],
			},
			autoprefixer: {},
			...(overrides?.plugins ?? {}),
		},
		...(overrides ?? {}),
	};
};
