// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const request = z.object({ plan: z.string().optional(), intent: z.string().optional(), method: z.string().optional(), interval: z.string().optional() });
export type Request = z.infer<typeof request>

const operation = {
	url: '/api/v1/subscription/upgrade',
	method: 'post',
	tags: [
		'Subscription',
	],
	operationId: 'postSubscriptionsSubscribe',
};

export default async function postSubscriptionsSubscribeRequest (body: Request, options = {}) {
	const wrapped = client.wrapper(operation, body, options);
	wrapped.request(request);
	return wrapped.run();
}
