import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export default defineConfig({
	testDir: path.resolve(__dirname, '../../'),
	testMatch: '**/*.spec.?(c|m)[jt]s?(x)',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: 'html',
	use: {
		baseURL: 'http://localhost:7655',
		trace: 'retry-with-trace',
		storageState: 'state.json',
	},
	projects: [
		{
			name: 'setup',
			testMatch: /test\/playwright\/features\/setup.ts/,
			teardown: 'teardown',
		},
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
			dependencies: ['setup'],
		},
		{
			name: 'teardown',
			testMatch: /test\/playwright\/features\/teardown.ts/,
		},
	],
	// webServer: {
	// 	command: 'node test/playwright/server/server.js',
	// 	url: 'http://0.0.0.0:7655',
	// 	timeout: 240 * 1000,
	// 	reuseExistingServer: !process.env.CI,
	// 	stdout: 'ignore',
	// 	stderr: 'pipe',
	// },
});
