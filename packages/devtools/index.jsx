import { getHistory } from '@novel/next/request';
import dynamic from 'next/dynamic';

export const history = [];

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
