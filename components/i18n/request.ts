import { headers } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
	const config = JSON.parse(process.env.NEXT_PUBLIC_LOCALES) || {};
	const locale = (await headers()).get('x-locale') ?? config.defaultLocale;
	return {
		messages: (await import(`../../locales/${locale}`)).default,
	};
});
