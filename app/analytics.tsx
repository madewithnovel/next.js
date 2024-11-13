'use client';

// find in https://tagmanager.google.com/#/home#tags
import { GoogleAnalytics, GoogleTagManager, sendGAEvent } from '@next/third-parties/google';
import { ANALYTICS } from 'app/constants';

// https://github.com/4lejandrito/next-plausible
// https:// github.com/derrickreimer/fathom-client

export function event (event, action, data) {
	if (ANALYTICS.driver === 'ga4' && ANALYTICS.id) {
		sendGAEvent(event, action, data);
	}
}

export function page (event, action, data) {
	if (ANALYTICS.driver === 'ga4' && ANALYTICS.id) {
		// automatic
	}
}

export function Analytics (options) {
	if (ANALYTICS.driver === 'ga4' && ANALYTICS.id) {
		return (
			<>
				{ANALYTICS.id.includes('GT-') && <GoogleTagManager gtmId={ANALYTICS.id} {...options?.gtm}/>}
				{!ANALYTICS.id.includes('GT-') && <GoogleAnalytics gaId={ANALYTICS.id} />}
			</>
		);
	}
	return <></>;
}
