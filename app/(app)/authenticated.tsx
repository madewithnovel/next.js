import getSession from 'components/hooks/get-session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import Client from './client';

export default async function Authenticated ({ children }) {
	const cookiejar = await cookies();
	if (!cookiejar.has('user')) {
		return redirect('/login?error=NO_SESSION');
	}

	const context = await getSession();
	return (
		<>
			<Client session={context?.session}/>
			{children}
		</>
	);
}
