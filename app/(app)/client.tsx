'use client';

import getSession from 'components/hooks/get-session';
import Script from 'next/script';
import * as notifications from 'novel/notifications';
import store from 'novel/store';
import { useEffect } from 'react';

export default function Client ({ session }) {
	if (session) {
		store.set('session', session);
	} else {
		(async () => {
			const session = await getSession();
			store.set('session', session);
		})();
	}

	useEffect(() => {
		notifications.setup().then(() => null);
	}, []);

	return (
		<>
			<Script
				src={`${process.env.NEXT_PUBLIC_API_HOST}/docs/openapi/json`}
				id="openapi"
				onLoad={() => {
					console.log(document.getElementById('openapi'));
				}}
			/>
		</>
	);
}
