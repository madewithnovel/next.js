// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const request = z.object({ session_id: z.string().optional() });
export type Request = z.infer<typeof request>

const operation = {
	url: '/api/v1/account/sessions',
	method: 'delete',
	tags: [
		'Account',
	],
	operationId: 'deleteAccountSessionsRevoke',
};

export default async function deleteAccountSessionsRevokeRequest (body: Request, options = {}) {
	const wrapped = client.wrapper(operation, body, options);
	wrapped.request(request);
	return wrapped.run();
}
