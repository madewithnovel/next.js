'use strict';

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const { withSentryConfig } = require('@sentry/nextjs');
const createNextIntlPlugin = require('next-intl/plugin');
const path = require('path');
const fs = require('fs');
const merge = require('lodash.merge');

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
				source: '/sw.js',
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

// TODO: lodash merge

/**
 * @param overrides {import('next').NextConfig}
 * @returns {import('next').NextConfig}
 */
module.exports = (overrides) => {
	if (process.env.NODE_ENV !== 'production') {
		process.env.NEXT_PUBLIC_DEV_CWD = process.cwd();
	}
	const { novel, i18n, analytics, ...rest } = overrides;
	// we want to pass novel and i18n into middleware
	process.env.NEXT_PUBLIC_LOCALES = JSON.stringify(i18n);
	process.env.NEXT_PUBLIC_NOVEL_CONFIG = JSON.stringify(novel);
	process.env.NEXT_PUBLIC_ANALYTICS = JSON.stringify(analytics);
	require('../sdk/setup').setup().then();
	const withNextIntl = createNextIntlPlugin('./components/i18n/request.ts');
	if (PHASE_DEVELOPMENT_SERVER) { // TODO: this is here until sentry fixes turbo support
		return withNextIntl(merge(nextConfig, rest));
	}
	return withSentryConfig(withNextIntl(merge(nextConfig, rest)), SentryConfig);
};
