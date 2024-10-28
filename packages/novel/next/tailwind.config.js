/**
 * @param overrides {import('tailwindcss').Config}
 * @returns {import('tailwindcss').Config}
 */
module.exports = function withTailwindDefaults (overrides) {
	return {
		darkMode: ['class'],
		content: [
			'app/**/*.{js,jsx,ts,tsx}',
			'components/**/*.{js,jsx,ts,tsx}',
			'packages/**/*.{js,jsx,ts,tsx}',
			'!**/node_modules/**/*.{js,jsx,ts,tsx}',
			...(overrides?.content ?? []),
		],
		theme: overrides?.theme ?? {},
		plugins: [
			require('tailwindcss-animate'),
			require('@tailwindcss/forms'),
			require('@tailwindcss/typography'),
			require('@headlessui/tailwindcss')({ prefix: 'ui' }),
			...(overrides?.plugins ?? []),
		],
	};
};
