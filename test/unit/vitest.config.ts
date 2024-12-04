/// <reference types="vitest" />
import path from 'path';
import { defineConfig } from 'vite';

// from https://github.com/vitest-dev/vitest/blob/main/test/global-setup/vitest.config.ts
export default defineConfig({
	plugins: [],
	test: {
		include: [path.resolve(__dirname, '../../') + '/**/*.test.?(c|m)[jt]s?(x)'],
		globalSetup: [
			'./setup.ts',
		],
	},
});
