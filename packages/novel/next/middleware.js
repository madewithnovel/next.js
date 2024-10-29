import { NextResponse } from 'next/server';

export default function middleware (middleware) {
	return async function (request) {
		// TODO: leaving this here until next.js fixes it's nonce
		// script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
		// style-src 'self' 'nonce-${nonce}';
		// add localhost:7634 to bucket as cors
		const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
		let cspHeader = `
		    default-src 'self';
            script-src 'self' 'nonce-${nonce}' 'unsafe-eval' js.stripe.com https: http: ${process.env.NODE_ENV === 'production' ? '' : '\'unsafe-eval\''};
		    style-src 'self' 'unsafe-inline';
		    connect-src 'self' *.r2.cloudflarestorage.com ${process.env.NEXT_PUBLIC_API_HOST};
		    frame-src js.stripe.com;
		    img-src 'self' *.r2.dev blob: data:;
		    font-src 'self';
		    object-src 'none';
		    base-uri 'self';
		    form-action 'self';
		    frame-ancestors 'none';
		    block-all-mixed-content;
		`;

		if (process.env.NODE_ENV !== 'development') {
			cspHeader += ' upgrade-insecure-requests;';
		}

		const contentSecurityPolicyHeaderValue = cspHeader
			.replace(/\s{2,}/g, ' ')
			.trim();

		const requestHeaders = new Headers(request.headers);
		requestHeaders.set('x-nonce', nonce);
		requestHeaders.set('Content-Security-Policy', contentSecurityPolicyHeaderValue);

		const locales = process.env.NEXT_PUBLIC_LOCALES ? JSON.parse(process.env.NEXT_PUBLIC_LOCALES) : {};
		const { pathname } = request.nextUrl;
		const defaultLocale = request.headers.get('x-locale') || locales?.defaultLocale || 'en';
		const matched = pathname.match(new RegExp(`^/(${locales.locales.join('|')})(/.*)?$`));

		let response;
		let locale;
		if (matched) {
			const url = request.nextUrl.clone();
			url.pathname = matched[2] || '/';
			response = NextResponse.rewrite(url, { request: { headers: requestHeaders } });
			locale = matched[1];
		} else {
			response = NextResponse.next({ request: { headers: requestHeaders } });
			locale = defaultLocale;
		}
		response.headers.set('x-locale', locale);
		response.headers.set('Content-Security-Policy', contentSecurityPolicyHeaderValue);

		// run the userland middleware
		const returned = await middleware(request, response);
		if (returned instanceof NextResponse) {
			return returned;
		}
		return response;
	};
}
