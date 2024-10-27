import createIntlMiddleware from 'next-intl/middleware';

export default function middleware (config) {
	return function (request) {
		config.i18n.defaultLocale = request.headers.get('x-locale') || 'en';
		const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

		// TODO: leaving this here until next.js fixes it's nonce
		// script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
		// style-src 'self' 'nonce-${nonce}';
		// add localhost:7634 to bucket as cors
		let cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'unsafe-eval' js.stripe.com;
    connect-src 'self' *.r2.cloudflarestorage.com ${process.env.NEXT_PUBLIC_API_HOST};
    frame-src js.stripe.com;
    style-src 'self' 'unsafe-inline';
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

		// Step 2: Create and call the next-intl middleware (example)
		const handleI18nRouting = createIntlMiddleware(config.i18n);
		const response = handleI18nRouting(request);
		response.headers.set('x-locale', config.i18n.defaultLocale);
		response.headers.set('x-nonce', nonce);
		response.headers.set(
			'Content-Security-Policy',
			cspHeader.replace(/\s{2,}/g, ' ').trim(),
		);
		return response;
	};
}
