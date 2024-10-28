'use client';

import store from 'novel/store';
import { useEffect } from 'react';

export default function Client ({ session }) {
	useEffect(() => {
		if (session) {
			store.set('session', session);
		}
	}, [session]);

	return <></>;
}
