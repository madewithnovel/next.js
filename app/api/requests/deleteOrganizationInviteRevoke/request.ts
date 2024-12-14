// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const request = z.object({ invites: z.array(z.object({ email: z.string().email().optional() })).optional() });
export type Request = z.infer<typeof request>

const operation = {
	url: '/api/v1/organization/invite',
	method: 'delete',
	tags: [
		'Organization',
	],
	operationId: 'deleteOrganizationInviteRevoke',
};

export default async function deleteOrganizationInviteRevokeRequest (body: Request, options = {}) {
	const wrapped = client.wrapper(operation, body, options);
	wrapped.request(request);
	return wrapped.run();
}
