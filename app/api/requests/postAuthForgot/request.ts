// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const request = z.object({ email: z.string().email().optional() });
export type Request = z.infer<typeof request>

const operation = {
	url: '/auth/forgot',
	method: 'post',
	tags: [
		'Auth',
	],
	operationId: 'postAuthForgot',
};

export default async function postAuthForgotRequest (body: Request, options = {}) {
	const wrapped = client.wrapper(operation, body, options);
	wrapped.request(request);
	return wrapped.run();
}
