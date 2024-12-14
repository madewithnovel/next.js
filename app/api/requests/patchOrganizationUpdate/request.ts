// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const request = z.object({ name: z.string().min(3).optional(), email: z.string().email().optional() });
export type Request = z.infer<typeof request>

const operation = {
	url: '/api/v1/organization',
	method: 'patch',
	tags: [
		'Organization',
	],
	operationId: 'patchOrganizationUpdate',
};

export default async function patchOrganizationUpdateRequest (body: Request, options = {}) {
	const wrapped = client.wrapper(operation, body, options);
	wrapped.request(request);
	return wrapped.run();
}
