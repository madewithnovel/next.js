// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const response = z.object({ events: z.array(z.object({ request_id: z.string().optional(), access_id: z.string().optional(), timestamp: z.string().optional(), method: z.string().optional(), url: z.string().optional(), status: z.string().optional(), ip: z.string().optional(), origin: z.string().optional() })).optional() });
export type Response = z.infer<typeof response>

const operation = {
	url: '/api/v1/api-keys/events',
	method: 'get',
	tags: [
		'Keys',
	],
	operationId: 'getApiKeyAccess',
};

export default async function getApiKeyAccessRequest (options = {}) {
	const wrapped = client.wrapper<Response>(operation, options);

	return wrapped.run();
}
