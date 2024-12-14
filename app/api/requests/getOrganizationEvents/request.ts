// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const response = z.object({ events: z.array(z.object({ request_id: z.string().optional(), event_id: z.string().optional(), timestamp: z.string().optional(), action: z.string().optional(), message: z.string().optional(), context: z.record(z.any()).optional() })).optional() });
export type Response = z.infer<typeof response>

const operation = {
	url: '/api/v1/organization/events',
	method: 'get',
	tags: [
		'Organization',
	],
	operationId: 'getOrganizationEvents',
};

export default async function getOrganizationEventsRequest (options = {}) {
	const wrapped = client.wrapper<Response>(operation, options);

	return wrapped.run();
}
