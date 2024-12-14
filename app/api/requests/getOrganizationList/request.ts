// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const response = z.object({ organizations: z.array(z.object({ id: z.string().optional(), name: z.string().optional(), type: z.string().optional(), email: z.string().email().optional() })).optional() });
export type Response = z.infer<typeof response>

const operation = {
	url: '/api/v1/organizations',
	method: 'get',
	tags: [
		'Organization',
	],
	operationId: 'getOrganizationList',
};

export default async function getOrganizationListRequest (options = {}) {
	const wrapped = client.wrapper<Response>(operation, options);

	return wrapped.run();
}
