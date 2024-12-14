// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const request = z.object({ sudo_password: z.string() });
export type Request = z.infer<typeof request>

const operation = {
	url: '/api/v1/account/mfa',
	method: 'delete',
	tags: [
		'Account',
	],
	operationId: 'deleteAccountMfaRevoke',
};

export default async function deleteAccountMfaRevokeRequest (body: Request, options = {}) {
	const wrapped = client.wrapper(operation, body, options);
	wrapped.request(request);
	return wrapped.run();
}
