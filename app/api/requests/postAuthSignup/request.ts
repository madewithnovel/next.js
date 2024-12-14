// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const request = z.object({ email: z.string().email(), password: z.string(), intent: z.string().optional(), interval: z.enum(['month', 'year']).optional(), plan: z.string().optional(), invitation_code: z.string().optional() });
export type Request = z.infer<typeof request>

export const response = z.object({ redirect_to: z.string().optional() }).describe('Sign up successful. Redirecting to next step...');
export type Response = z.infer<typeof response>

const operation = {
	url: '/signup',
	method: 'post',
	tags: [
		'Auth',
	],
	operationId: 'postAuthSignup',
};

export default async function postAuthSignupRequest (body: Request, options = {}) {
	const wrapped = client.wrapper<Response>(operation, body, options);
	wrapped.request(request);
	return wrapped.run();
}
