// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const request = z.object({ password: z.string().min(6).max(64), new_password: z.string().min(6).max(64) });
export type Request = z.infer<typeof request>

const operation = {
	url: '/api/v1/account/password',
	method: 'post',
	tags: [
		'Account',
	],
	operationId: 'postAccountUpdatePassword',
};

export default async function postAccountUpdatePasswordRequest (body: Request, options = {}) {
	const wrapped = client.wrapper(operation, body, options);
	wrapped.request(request);
	return wrapped.run();
}
