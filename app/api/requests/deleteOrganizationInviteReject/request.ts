// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const request = z.object({ invitation_code: z.string().optional() });
export type Request = z.infer<typeof request>

const operation = {
	url: '/api/v1/organization/invite/reject',
	method: 'delete',
	tags: [
		'Organization',
	],
	operationId: 'deleteOrganizationInviteReject',
};

export default async function deleteOrganizationInviteRejectRequest (body: Request, options = {}) {
	const wrapped = client.wrapper(operation, body, options);
	wrapped.request(request);
	return wrapped.run();
}
