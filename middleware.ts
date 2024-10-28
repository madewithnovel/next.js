import type { NextRequest, NextResponse } from "next/server";
import novelMiddleware from 'novel/next/middleware';

export const config = {
	matcher: [
		'/((?!_next).*)',
	],
};

export default novelMiddleware(
	/**
	 * Add your custom Next.js middleware here. This function will be called for every request.
	 */
	async (request: NextRequest, response: NextResponse) => {
		return response;
	}
);
