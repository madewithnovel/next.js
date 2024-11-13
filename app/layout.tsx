/**
 * This is where themes are stored and common styles you wish to show
 * up across your app, login, and marketing pages.
 */
import './globals.css';
/**
 * Common elements that can be reused that does not need to be imported
 * explicitly to be used. You can modify these styles accordingly.
 */
import 'components/elements/base.css';

import { Analytics } from 'app/analytics';
import { NOVEL } from 'app/constants';
import { WebVitals } from 'app/vitals';
import { cookies } from 'next/headers';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Devtools } from 'novel/devtools';

import Client from './client';

export const metadata = {
	title: NOVEL.title,
	description: NOVEL.description,
};

export default async function RootLayout ({ children }) {
	const locale = await getLocale();
	const messages = await getMessages();
	/**
	 * Modify below if you need to add global providers or a common layout across
	 * your marketing, login, and app pages.
	 */
	return (
		<html lang={locale} suppressHydrationWarning>
			<Client />
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
			</head>
			<body className="min-w-full min-h-screen flex flex-col relative">
				<NextIntlClientProvider messages={messages}>
					{children}
				</NextIntlClientProvider>
				<Devtools />
				<Analytics />
				<WebVitals />
			</body>
		</html>
	);
}
