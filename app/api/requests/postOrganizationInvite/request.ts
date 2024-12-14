// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const request = z.object({ invites: z.array(z.object({ email: z.string().email().optional(), roles: z.array(z.string()).optional() })).describe('List of emails to invite.').optional() });
export type Request = z.infer<typeof request>

const operation = {
	url: '/api/v1/organization/invite',
	method: 'post',
	tags: [
		'Organization',
	],
	operationId: 'postOrganizationInvite',
};

export default async function postOrganizationInviteRequest (body: Request, options = {}) {
	const wrapped = client.wrapper(operation, body, options);
	wrapped.request(request);
	return wrapped.run();
}
