import { NextResponse } from "next/server";
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

let locales = ['en-US', 'nl-NL', 'nl']

// Get the preferred locale, similar to the above or using a library
function getLocale(request) {
	let headers = { 'accept-language': 'en-US,en;q=0.5' }
	let languages = new Negotiator({ headers }).languages()
	let locales = ['en-US', 'nl-NL', 'nl']
	let defaultLocale = 'en-US'
	return match(languages, locales, defaultLocale) // -> 'en-US'
}

const supportedLanguages = ['en', 'fr', 'es']; // Add other language codes as needed


export function middleware(request) {
	const { pathname } = request.nextUrl;

	// Regex pattern to match any language prefix in the supportedLanguages array
	const languagePattern = new RegExp(`^/(${supportedLanguages.join('|')})(/.*)?$`);
	const match = pathname.match(languagePattern);

	if (match) {
		// Rewrite to the path without the language prefix
		const url = request.nextUrl.clone();
		url.pathname = match[2] || '/';
		const response = NextResponse.rewrite(url);
		response.headers.set('x-locale', match[1]);
		return response;
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		// Skip all internal paths (_next)
		'/((?!_next).*)',
		// Optional: only run on root (/) URL
		// '/'
	],
}