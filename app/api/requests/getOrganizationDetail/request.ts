// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const response = z.object({ organization: z.object({ id: z.string().optional(), name: z.string().optional(), type: z.string().optional(), email: z.string().email().optional(), quotas: z.record(z.any()).optional(), settings: z.record(z.any()).optional() }).optional() });
export type Response = z.infer<typeof response>

const operation = {
	url: '/api/v1/organization',
	method: 'get',
	tags: [
		'Organization',
	],
	operationId: 'getOrganizationDetail',
};

export default async function getOrganizationDetailRequest (options = {}) {
	const wrapped = client.wrapper<Response>(operation, options);

	return wrapped.run();
}
