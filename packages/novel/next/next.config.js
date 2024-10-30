'use strict';

// process.env.SENTRY_SUPPRESS_TURBOPACK_WARNING = 1;
// const { withSentryConfig } = require('@sentry/nextjs');

const path = require('path');
const fs = require('fs');

require('dotenv').config();

if (fs.existsSync(path.resolve(process.cwd(), '.env'))) {
	require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });
}

/** @type {import('next').NextConfig} */
const nextConfig = {
	poweredByHeader: false,
	trailingSlash: false,
	transpilePackages: ['novel'],
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '*.r2.dev',
			},
		],
	},
	async headers () {
		return [
			{
				source: '/service-worker.js',
				headers: [
					{
						key: 'Content-Type',
						value: 'application/javascript; charset=utf-8',
					},
					{
						key: 'Cache-Control',
						value: 'no-cache, no-store, must-revalidate',
					},
					{
						key: 'Content-Security-Policy',
						value: 'default-src \'self\'; script-src \'self\'',
					},
				],
			},
		];
	},
};

if (process.env.NODE_ENV !== 'production' && process.env.NEXT_PUBLIC_API_HOST?.includes('https')) {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

const SentryConfig = {
	silent: !process.env.CI,
	widenClientFileUpload: true,
	// tunnelRoute: "/monitoring",
	hideSourceMaps: true,
	disableLogger: true,
	automaticVercelMonitors: false,
};

/**
 * @param overrides {import('next').NextConfig}
 * @returns {import('next').NextConfig}
 */
module.exports = (overrides) => {
	if (process.env.NODE_ENV !== 'production') {
		process.env.NEXT_PUBLIC_DEV_CWD = process.cwd();
	}
	const { novel, i18n, ...rest } = overrides;
	// we want to pass novel and i18n into middleware
	process.env.NEXT_PUBLIC_LOCALES = JSON.stringify(i18n);
	process.env.NEXT_PUBLIC_NOVEL_CONFIG = JSON.stringify(novel);
	require('../sdk/setup').setup(require('app/api/schema.json')).then();
	return { ...rest, ...nextConfig };
	// return withSentryConfig({ ...rest, ...nextConfig }, SentryConfig);
};
