// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const request = z.object({ email: z.string().email(), password: z.string(), token: z.string() });
export type Request = z.infer<typeof request>

const operation = {
	url: '/auth/reset',
	method: 'post',
	tags: [
		'Auth',
	],
	operationId: 'postAuthReset',
};

export default async function postAuthResetRequest (body: Request, options = {}) {
	const wrapped = client.wrapper(operation, body, options);
	wrapped.request(request);
	return wrapped.run();
}
