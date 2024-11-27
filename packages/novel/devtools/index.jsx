import dynamic from 'next/dynamic';

import { getHistory } from '../request';

const Client = process.env.NODE_ENV === 'development'
	? dynamic(() => import('./client'))
	: null;

export default async function Devtools () {
	if (Client) {
		const requests = getHistory();
		return <Client requests={requests} />;
	}
	return <></>;
}
