// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const response = z.object({ plans: z.array(z.object({ id: z.string().optional(), name: z.string().optional(), monthly: z.record(z.any()).optional(), yearly: z.record(z.any()).optional(), trial: z.number().optional() })).optional() });
export type Response = z.infer<typeof response>

const operation = {
	url: '/api/v1/plans',
	method: 'get',
	tags: [
		'Application',
	],
	operationId: 'getSubscriptionsPlans',
};

export default async function getSubscriptionsPlansRequest (options = {}) {
	const wrapped = client.wrapper<Response>(operation, options);

	return wrapped.run();
}
