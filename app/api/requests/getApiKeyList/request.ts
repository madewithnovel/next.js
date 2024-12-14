// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const response = z.object({ keys: z.array(z.object({ access_id: z.string().optional(), secret_key: z.string().optional(), label: z.string().optional(), scope: z.string().optional(), expiry: z.string().optional(), expired: z.boolean().optional(), created_at: z.string().optional(), expires_at: z.string().optional(), last_used: z.string().optional() })).optional() });
export type Response = z.infer<typeof response>

const operation = {
	url: '/api/v1/api-keys',
	method: 'get',
	tags: [
		'Keys',
	],
	operationId: 'getApiKeyList',
};

export default async function getApiKeyListRequest (options = {}) {
	const wrapped = client.wrapper<Response>(operation, options);

	return wrapped.run();
}
