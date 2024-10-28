'use strict';

module.exports = {
	root: true,
	extends: [
		'next/core-web-vitals',
		'next/typescript',
		'eslint:recommended',
		'standard',
	],
	plugins: [
		'json',
		'unicorn',
	],
	env: {
		node: true,
	},
	rules: {
		semi: ['error', 'always'],
		indent: ['error', 'tab'],
		quotes: ['error', 'single'],
		'comma-dangle': ['error', 'always-multiline'],
		'global-require': ['off'],
		'no-tabs': ['off'],
		'no-use-before-define': ['off'],
		'max-len': ['error', { code: 350 }],
		camelcase: ['off'],
		'unicorn/filename-case': ['error', { case: 'kebabCase' }],
		'no-inner-declarations': ['off'],
		'object-curly-newline': ['off'],
		'import/no-extraneous-dependencies': ['off'],
		'@typescript-eslint/no-require-imports': ['off'],
	},
};
