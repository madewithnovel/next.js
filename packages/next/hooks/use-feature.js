'use client';

import store from '@novel/next/store';

export default function useFeature (features) {
	const session = store.get('session');
	return features.every(feature => session.flags.includes(feature));
}
