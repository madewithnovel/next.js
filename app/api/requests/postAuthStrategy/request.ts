// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const request = z.object({ email: z.string().email().optional(), password: z.string().optional() });
export type Request = z.infer<typeof request>

export const response = z.object({ redirect_to: z.string().optional() }).describe('Authentication successful. Redirecting to next step...');
export type Response = z.infer<typeof response>

const operation = {
	url: '/auth/{strategy}',
	method: 'post',
	tags: [
		'Auth',
	],
	operationId: 'postAuthStrategy',
};

export default async function postAuthStrategyRequest (param0: string, body: Request, options = {}) {
	const wrapped = client.wrapper<Response>(operation, param0, body, options);
	wrapped.request(request);
	return wrapped.run();
}
