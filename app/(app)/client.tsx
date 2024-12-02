'use client';

import getSession from '@novel/next/hooks/get-session';
import store from '@novel/next/store';

export default function Client ({ session }) {
	if (session) {
		store.set('session', session);
	} else {
		(async () => {
			const session = await getSession();
			store.set('session', session);
		})();
	}

	return (<></>);
}
