'use strict';

module.exports = {
	extends: [
		'next/core-web-vitals',
		'next/typescript',
		'eslint:recommended',
		'standard',
	],
	plugins: [
		'json',
		'unicorn',
		'jsx-a11y',
		'react',
		'react-hooks',
		'simple-import-sort',
		'import',
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
		'import/prefer-default-export': ['off'],
		'import/no-extraneous-dependencies': ['off'],
		'import/first': 'error',
		'import/newline-after-import': 'error',
		'import/no-duplicates': 'error',
		'simple-import-sort/imports': ['error'],
		'@typescript-eslint/no-require-imports': ['off'],
		'@typescript-eslint/no-var-requires': ['off'],
	},
	overrides: [
		{
			files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
				ecmaVersion: 12,
				sourceType: 'module',
			},
			plugins: [],
			extends: ['next'],
			rules: {
				'react/jsx-indent': ['error', 'tab'],
				'react/jsx-indent-props': ['error', 'tab'],
				'react/jsx-props-no-spreading': ['off'],
				'react/no-array-index-key': ['warn'],
				'react/no-unescaped-entities': ['warn'],
				'@next/next/no-html-link-for-pages': ['off'],
			},
		},
	],
	settings: {
		next: {
			rootDir: '/',
		},
	},
};
