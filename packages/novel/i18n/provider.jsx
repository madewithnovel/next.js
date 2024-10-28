'use server';

import { headers } from 'next/headers';

export async function getI18n(locale) {
	locale = (await headers()).get('x-locale') ?? locale;
	const config = JSON.parse(process.env.NEXT_PUBLIC_LOCALES);
	if (!locale) {
		locale = config.defaultLocale;
	}
	const messages = await import(`../../../locales/${locale}/index.json`);

	// build messages
	return {
		locale,
		locales: config.locales,
		messages: messages.default,
	}
}