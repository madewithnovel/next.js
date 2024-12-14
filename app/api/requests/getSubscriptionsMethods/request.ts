// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const response = z.object({ payment_methods: z.array(z.object({ id: z.string().optional(), type: z.string().optional(), card: z.object({ brand: z.string().optional(), last4: z.string().optional(), expiry_month: z.string().optional(), expiry_year: z.string().optional() }).optional() })).optional() });
export type Response = z.infer<typeof response>

const operation = {
	url: '/api/v1/subscription/cards',
	method: 'get',
	tags: [
		'Subscription',
	],
	operationId: 'getSubscriptionsMethods',
};

export default async function getSubscriptionsMethodsRequest (options = {}) {
	const wrapped = client.wrapper<Response>(operation, options);

	return wrapped.run();
}
