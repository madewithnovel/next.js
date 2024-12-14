// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const response = z.object({ members: z.array(z.object({ id: z.string().optional(), role: z.string().optional(), email: z.string().email().optional(), display_name: z.string().optional(), picture: z.string().optional(), metadata: z.record(z.any()).optional(), status: z.string().optional(), mfa: z.boolean().optional() })).optional() });
export type Response = z.infer<typeof response>

const operation = {
	url: '/api/v1/organization/members',
	method: 'get',
	tags: [
		'Organization',
	],
	operationId: 'getOrganizationMembers',
};

export default async function getOrganizationMembersRequest (options = {}) {
	const wrapped = client.wrapper<Response>(operation, options);

	return wrapped.run();
}
