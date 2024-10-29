import { getHistory } from '../request';
import Client from './client';

export async function Devtools () {
	if (process.env.NODE_ENV === 'production') {
		return <></>;
	}
	const requests = getHistory();
	return <Client requests={requests} />;
}
