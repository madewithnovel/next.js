import './styles.css';

import getSession from '@novel/next/hooks/get-session';
import Toaster from 'components/elements/toast';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import Client from './client';
import WithSidebarLayout from './layouts/with-sidebar';

/**
 * This ensures that everything in the dashboard is dynamic.
 */
export const dynamic = 'force-dynamic';

export default async function Layout ({ children }) {
	const cookiejar = await cookies();
	if (!cookiejar.has('user')) {
		return redirect('/login?error=NO_SESSION');
	}

	const session = await getSession();
	return (
		<>
			<Client session={session}/>
			<WithSidebarLayout>
				{session.subscribed === false && (
					<div className="w-full bg-amber-400 text-amber-900 py-1 text-sm text-center z-50">You are not subscribed to a plan</div>
				)}
				{children}
			</WithSidebarLayout>
			<Toaster position="bottom-right" reverseOrder={false} gutter={8} toastOptions={{ duration: 10000 }}/>
		</>
	);
}
