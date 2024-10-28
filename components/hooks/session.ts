import store from 'novel/store';

// for api endpoints and pages that require authentication
export function useSession () {
	if (typeof window !== 'undefined') {
		return store.get('session');
	} else {

	}
}
