import './styles.css';

import Toaster from 'components/elements/toast';
import getSession from 'components/hooks/get-session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import Client from './client';
import WithSidebarLayout from './layouts/with-sidebar';

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
				{ children }
			</WithSidebarLayout>
			<Toaster position="bottom-right" reverseOrder={false} gutter={8} toastOptions={{ duration: 10000 }}/>
		</>
	);
}
