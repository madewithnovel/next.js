// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const request = z.object({ account_id: z.string().optional(), roles: z.array(z.string()).optional() });
export type Request = z.infer<typeof request>

const operation = {
	url: '/api/v1/organization/promote',
	method: 'post',
	tags: [
		'Organization',
	],
	operationId: 'postOrganizationMembersPromote',
};

export default async function postOrganizationMembersPromoteRequest (body: Request, options = {}) {
	const wrapped = client.wrapper(operation, body, options);
	wrapped.request(request);
	return wrapped.run();
}
