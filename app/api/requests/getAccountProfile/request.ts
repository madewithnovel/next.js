// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const response = z.object({ profile: z.object({ id: z.string().optional(), email: z.string().email().optional(), display_name: z.string().optional(), picture: z.string().url().optional(), url: z.string().url().optional(), verified: z.boolean().optional(), metadata: z.record(z.any()).optional() }).optional(), settings: z.record(z.any()).optional() });
export type Response = z.infer<typeof response>

const operation = {
	url: '/api/v1/account',
	method: 'get',
	tags: [
		'Account',
	],
	operationId: 'getAccountProfile',
};

export default async function getAccountProfileRequest (options = {}) {
	const wrapped = client.wrapper<Response>(operation, options);

	return wrapped.run();
}
