'use client';

import store from '@novel/next/store';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

function getTheme (theme: string) {
	const storedTheme = store.get('theme');
	theme = theme === 'system' ? 'light' : theme;
	if (storedTheme) {
		theme = storedTheme === 'dark' ? 'dark' : 'light';
	}
	return theme;
}

export default function Client () {
	const { theme, setTheme } = useTheme();
	useEffect(() => {
		setTheme(getTheme(theme));
	}, []);
	return <></>;
}
