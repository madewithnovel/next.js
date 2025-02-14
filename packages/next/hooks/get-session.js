import getSessionContextRequest from 'app/api/requests/getSessionContext';
import { redirect } from 'next/navigation';

export default async function getSession () {
	try {
		/**
		 * NOTE: This is only called once on each page load.
		 */
		const response = await getSessionContextRequest();
		if (response.ok) {
			const context = await response.json();
			return context.session;
		}
	} catch (error) {
		if (error?.digest?.includes('NEXT_REDIRECT')) {
			if (typeof window === 'undefined') {
				redirect('/login?error=NO_SESSION');
			} else {
				window.location.href = '/login?error=NO_SESSION';
				throw error;
			}
		} else {
			console.error(error);
		}
	}
}
