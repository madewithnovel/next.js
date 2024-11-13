import type { NextRequest, NextResponse } from 'next/server';
import novelMiddleware from 'novel/next/middleware';

export const config = {
	matcher: [
		{
			source: '/((?!_next|manifest.webmanifest|favicon.ico|sw.js).*)',
			missing: [
				{ type: 'header', key: 'next-router-prefetch' },
				{ type: 'header', key: 'purpose', value: 'prefetch' },
			],
		},
	],
};

export default novelMiddleware(
	/**
	 * Add your custom Next.js middleware here. This function will be called for every request.
	 */
	async (request: NextRequest, response: NextResponse) => {
		return response;
	},
);
