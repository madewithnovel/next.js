'use client';

import store from 'novel/store';

export function Client({data}) {
	store.set('i18n', data);
	return <></>
}