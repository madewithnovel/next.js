'use client';

import getSession from 'components/hooks/get-session';
import store from 'novel/store';
import { useEffect } from 'react';

export default function Client ({ session }) {
	useEffect(() => {
		if (session) {
			store.set('session', session);
		} else {
			(async () => {
				const session = await getSession();
				store.set('session', session);
			})();
		}
	}, [session]);
	return <></>;
}
