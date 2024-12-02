'use strict';

const merge = require('lodash.merge');

/**
 * @param overrides {import('postcss-load-config').Config}
 * @returns {import('postcss-load-config').Config}
 */
module.exports = function withNovelPostCSSDefaults (overrides) {
	return merge({
		plugins: {
			'@tailwindcss/nesting': {},
			tailwindcss: {},
			autoprefixer: {},
		},
	}, overrides);
};
