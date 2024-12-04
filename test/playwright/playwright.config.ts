import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export default defineConfig({
	testDir: './features',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: 'html',
	use: {
		baseURL: 'http://localhost:7634',
		trace: 'retry-with-trace',
		storageState: 'state.json',
	},
	projects: [
		{
			name: 'setup',
			testMatch: /setup.ts/,
			teardown: 'teardown',
		},
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
			dependencies: ['setup'],
		},
		{
			name: 'teardown',
			testMatch: /teardown.ts/,
		},
	],
});
