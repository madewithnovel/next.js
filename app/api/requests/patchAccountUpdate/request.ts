// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const request = z.object({ display_name: z.string().min(6).optional(), picture: z.string().url().optional(), url: z.string().url().optional() });
export type Request = z.infer<typeof request>

const operation = {
	url: '/api/v1/account',
	method: 'patch',
	tags: [
		'Account',
	],
	operationId: 'patchAccountUpdate',
};

export default async function patchAccountUpdateRequest (body: Request, options = {}) {
	const wrapped = client.wrapper(operation, body, options);
	wrapped.request(request);
	return wrapped.run();
}
