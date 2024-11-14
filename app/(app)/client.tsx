'use client';

import getSession from 'components/hooks/get-session';
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

	return <></>;
}
