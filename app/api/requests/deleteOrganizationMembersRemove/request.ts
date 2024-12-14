// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const request = z.object({ account_id: z.string().optional() });
export type Request = z.infer<typeof request>

const operation = {
	url: '/api/v1/organization/members',
	method: 'delete',
	tags: [
		'Organization',
	],
	operationId: 'deleteOrganizationMembersRemove',
};

export default async function deleteOrganizationMembersRemoveRequest (body: Request, options = {}) {
	const wrapped = client.wrapper(operation, body, options);
	wrapped.request(request);
	return wrapped.run();
}
