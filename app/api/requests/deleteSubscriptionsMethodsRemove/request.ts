// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const request = z.object({ payment_method_id: z.string() });
export type Request = z.infer<typeof request>

const operation = {
	url: '/api/v1/subscription/methods',
	method: 'delete',
	tags: [
		'Subscription',
	],
	operationId: 'deleteSubscriptionsMethodsRemove',
};

export default async function deleteSubscriptionsMethodsRemoveRequest (body: Request, options = {}) {
	const wrapped = client.wrapper(operation, body, options);
	wrapped.request(request);
	return wrapped.run();
}
