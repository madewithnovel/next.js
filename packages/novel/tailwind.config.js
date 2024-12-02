'use strict';

const merge = require('lodash.merge');

/**
 * @param overrides {import('tailwindcss').Config}
 * @returns {import('tailwindcss').Config}
 */
module.exports = function withTailwindDefaults (overrides) {
	return merge({
		darkMode: ['class'],
		content: [
			'app/**/*.{js,jsx,css,ts,tsx}',
			'components/**/*.{js,jsx,css,ts,tsx}',
			'packages/**/*.{js,jsx,css,ts,tsx}',
			'!**/node_modules/**/*.{js,jsx,css,ts,tsx}',
		],
		theme: {},
		plugins: [
			require('tailwindcss-animate'),
			require('@tailwindcss/forms'),
			require('@tailwindcss/typography'),
			require('@headlessui/tailwindcss')({ prefix: 'ui' }),
		],
	}, overrides);
};
