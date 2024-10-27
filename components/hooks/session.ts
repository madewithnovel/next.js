import store from 'novel/store';
import * as novel from 'novel/sdk';

export function useSession () {
	if (typeof window !== 'undefined') {
		return store.get('session');
	} else {
		return novel.app.session();
	}
}
