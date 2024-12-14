// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const request = z.object({ payment_method: z.string(), setup_intent: z.string() });
export type Request = z.infer<typeof request>

const operation = {
	url: '/api/v1/subscription/methods',
	method: 'post',
	tags: [
		'Subscription',
	],
	operationId: 'postSubscriptionsMethodsAdd',
};

export default async function postSubscriptionsMethodsAddRequest (body: Request, options = {}) {
	const wrapped = client.wrapper(operation, body, options);
	wrapped.request(request);
	return wrapped.run();
}
