// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const request = z.object({ plan: z.string().optional(), org_id: z.string().optional() });
export type Request = z.infer<typeof request>

export const response = z.object({ intent: z.object({ client_secret: z.string().optional() }).optional() }).describe('Payment intent creation successful.');
export type Response = z.infer<typeof response>

const operation = {
	url: '/signup/intent',
	method: 'post',
	tags: [
		'Auth',
	],
	operationId: 'postAuthPaymentIntent',
};

export default async function postAuthPaymentIntentRequest (body: Request, options = {}) {
	const wrapped = client.wrapper<Response>(operation, body, options);
	wrapped.request(request);
	return wrapped.run();
}
