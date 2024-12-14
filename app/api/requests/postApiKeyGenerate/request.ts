// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const request = z.object({ label: z.string().optional(), scope: z.record(z.any()).optional(), expiry: z.string().optional() });
export type Request = z.infer<typeof request>

export const response = z.object({ key: z.object({ access_id: z.string().optional(), secret_key: z.string().optional(), label: z.string().optional(), scope: z.string().optional(), expiry: z.string().optional(), expired: z.boolean().optional(), created_at: z.string().optional(), expires_at: z.string().optional(), last_used: z.string().optional() }).optional() }).describe('Key generated successfully.');
export type Response = z.infer<typeof response>

const operation = {
	url: '/api/v1/api-keys',
	method: 'post',
	tags: [
		'Keys',
	],
	operationId: 'postApiKeyGenerate',
};

export default async function postApiKeyGenerateRequest (body: Request, options = {}) {
	const wrapped = client.wrapper<Response>(operation, body, options);
	wrapped.request(request);
	return wrapped.run();
}
