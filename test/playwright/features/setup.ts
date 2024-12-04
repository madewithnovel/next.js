import { test as setup } from '@playwright/test';
import fs from 'fs';

setup('setup', async () => {
	/**
	 * This is a setup project that will run before the other projects.
	 */
	fs.writeFileSync('./state.json', '{}');
});
