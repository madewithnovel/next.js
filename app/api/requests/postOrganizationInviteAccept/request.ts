// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const request = z.object({ invitation_code: z.string().optional() });
export type Request = z.infer<typeof request>

const operation = {
	url: '/api/v1/organization/invite/accept',
	method: 'post',
	tags: [
		'Organization',
	],
	operationId: 'postOrganizationInviteAccept',
};

export default async function postOrganizationInviteAcceptRequest (body: Request, options = {}) {
	const wrapped = client.wrapper(operation, body, options);
	wrapped.request(request);
	return wrapped.run();
}
