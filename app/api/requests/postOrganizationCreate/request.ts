// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const request = z.object({ name: z.string().min(6), email: z.string().email(), personal: z.boolean().optional() });
export type Request = z.infer<typeof request>

const operation = {
	url: '/api/v1/organization',
	method: 'post',
	tags: [
		'Organization',
	],
	operationId: 'postOrganizationCreate',
};

export default async function postOrganizationCreateRequest (body: Request, options = {}) {
	const wrapped = client.wrapper(operation, body, options);
	wrapped.request(request);
	return wrapped.run();
}
