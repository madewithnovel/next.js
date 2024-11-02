'use client';

import store from 'novel/store';
import { useEffect, useState } from 'react';

import getSession from './get-session';

export default function useSession () {
	const [session, setSession] = useState(store.get('session'));
	useEffect(() => {
		if (!session) {
			(async () => {
				setSession(await getSession());
			})();
		}
	}, []);
	return session;
}
