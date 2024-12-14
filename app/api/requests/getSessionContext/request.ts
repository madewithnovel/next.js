// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const response = z.object({ session: z.object({ live: z.boolean().optional(), flags: z.record(z.any()).optional(), organizations: z.array(z.object({ id: z.string().optional(), name: z.string().optional(), type: z.string().optional() })).optional(), organization: z.object({ id: z.string().optional(), name: z.string().optional(), type: z.string().optional() }).optional(), subscribed: z.boolean().optional(), subscription: z.object({ name: z.string().optional(), status: z.string().optional(), subscription_id: z.string().optional() }).optional(), user: z.object({ id: z.string().optional(), email: z.string().email().optional(), display_name: z.string().optional(), picture: z.string().optional() }).optional(), settings: z.record(z.any()).optional(), role: z.string().optional(), permissions: z.array(z.record(z.any())).optional(), version: z.string().optional(), fetched: z.string().datetime({ offset: true }).optional() }).optional() });
export type Response = z.infer<typeof response>

const operation = {
	url: '/api/v1/session',
	method: 'get',
	tags: [
		'Application',
	],
	operationId: 'getSessionContext',
};

export default async function getSessionContextRequest (options = {}) {
	const wrapped = client.wrapper<Response>(operation, options);

	return wrapped.run();
}
