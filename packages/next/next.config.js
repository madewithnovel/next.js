'use strict';

const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants');
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
	transpilePackages: ['novel', '@novel/devtools'],
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '7634',
			},
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
	org: process.env.SENTRY_ORG,
	project: process.env.SENTRY_PROJECT,
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
	return async (phase) => {
		if (process.env.NODE_ENV !== 'production') {
			process.env.NEXT_PUBLIC_DEV_CWD = process.cwd();
		}
		const { novel, i18n, analytics, ...rest } = overrides;
		// we want to pass novel and i18n into middleware
		process.env.NEXT_PUBLIC_LOCALES = JSON.stringify(i18n);
		process.env.NEXT_PUBLIC_NOVEL_CONFIG = JSON.stringify(novel);
		process.env.NEXT_PUBLIC_ANALYTICS = JSON.stringify(analytics);
		if (phase === PHASE_PRODUCTION_BUILD || phase === PHASE_DEVELOPMENT_SERVER) { // only for non build commands?
			// TODO: if the api is not available, throw a warning
			await require('./sdk/setup').setup();
		}
		const withNextIntl = createNextIntlPlugin('./components/i18n/request.ts');
		if (phase === PHASE_DEVELOPMENT_SERVER) {
			// TODO: this is here until sentry fixes turbo support
			return withNextIntl(merge(nextConfig, rest));
		} else {
			return withSentryConfig(withNextIntl(merge(nextConfig, rest)), SentryConfig);
		}
	};
};
