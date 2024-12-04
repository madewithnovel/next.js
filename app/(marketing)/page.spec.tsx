import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
	await page.goto('http://localhost:7634/');
	await expect(page).toHaveTitle(/Novel/);
});

test('go to login screen', async ({ page }) => {
	await page.goto('http://localhost:7634/');
	await page.locator('a[href="/login"]').click();
	await expect(page.getByText('Login to Novel')).toBeVisible();
});
