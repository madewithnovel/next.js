// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const response = z.object({ subscribed: z.boolean().optional(), organization: z.object({ id: z.string().optional(), name: z.string().optional(), type: z.string().optional(), email: z.string().email().optional() }).optional(), subscription: z.any().optional(), quotas: z.record(z.any()).optional(), payment_methods: z.array(z.object({ id: z.string().optional(), type: z.string().optional(), card: z.object({ brand: z.string().optional(), last4: z.string().optional(), expiry_month: z.string().optional(), expiry_year: z.string().optional() }).optional() })).optional(), charges: z.array(z.object({ number: z.string().optional(), invoice: z.string().optional(), invoice_pdf: z.string().optional(), status: z.string().optional(), amount: z.string().optional(), currency: z.string().optional(), payment_method: z.string().optional(), email: z.string().email().optional(), paid_at: z.string().datetime({ offset: true }).optional() })).optional() });
export type Response = z.infer<typeof response>

const operation = {
	url: '/api/v1/subscription',
	method: 'get',
	tags: [
		'Subscription',
	],
	operationId: 'getSubscriptionsCurrent',
};

export default async function getSubscriptionsCurrentRequest (options = {}) {
	const wrapped = client.wrapper<Response>(operation, options);

	return wrapped.run();
}
