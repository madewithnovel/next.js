import { test as teardown } from '@playwright/test';
import fs from 'fs';

teardown('teardown', async () => {
	/**
	 * This is a teardown project that will run after the other projects.
	 */
	fs.rmSync('./state.json');
});
