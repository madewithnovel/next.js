// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const request = z.object({ token: z.string(), secret: z.string() });
export type Request = z.infer<typeof request>

const operation = {
	url: '/api/v1/account/mfa',
	method: 'put',
	tags: [
		'Account',
	],
	operationId: 'putAccountMfaRegister',
};

export default async function putAccountMfaRegisterRequest (body: Request, options = {}) {
	const wrapped = client.wrapper(operation, body, options);
	wrapped.request(request);
	return wrapped.run();
}
