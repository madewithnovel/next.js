// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const request = z.object({ otp: z.string().optional() });
export type Request = z.infer<typeof request>

const operation = {
	url: '/auth/{strategy}/mfa',
	method: 'post',
	tags: [
		'Auth',
	],
	operationId: 'postAuthMfa',
};

export default async function postAuthMfaRequest (param0: string, body: Request, options = {}) {
	const wrapped = client.wrapper(operation, param0, body, options);
	wrapped.request(request);
	return wrapped.run();
}
