'use client';

import store from '@novel/next/store';
import { useEffect } from 'react';

function applyTheme () {
	let theme = store.get('theme');
	if (!theme) {
		theme = 'light';
	}
	const session = store.get('session');
	if (session?.settings?.theme) {
		theme = session.settings.theme === 'dark' ? 'dark' : 'light';
	}
	store.set('theme', theme);
	// TODO: this warning shows up in the server console
	try {
		document.documentElement.classList.add(theme);
	} catch {}
}

applyTheme();

export default function Client () {
	useEffect(() => {
		applyTheme();
	}, []);

	return <></>;
}
