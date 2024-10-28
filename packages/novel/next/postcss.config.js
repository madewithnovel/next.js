'use strict';

/**
 * @param overrides {import('postcss-load-config').Config}
 * @returns {import('postcss-load-config').Config}
 */
module.exports = function withNovelPostCSSDefaults (overrides) {
	return {
		plugins: {
			'postcss-import': (overrides?.plugins?.['postcss-import'] ?? {}),
			'@tailwindcss/nesting': (overrides?.plugins?.['@tailwindcss/nesting'] ?? {}),
			tailwindcss: (overrides?.plugins?.tailwindcss ?? {}),
			autoprefixer: (overrides?.plugins?.autoprefixer ?? {}),
			...(overrides?.plugins ?? {}),
		},
		...(overrides ?? {}),
	};
};
