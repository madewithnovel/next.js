// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const request = z.object({ theme: z.string().optional(), timezone: z.string().optional(), language: z.string().optional(), marketing: z.boolean().optional(), newsletter: z.boolean().optional() });
export type Request = z.infer<typeof request>

const operation = {
	url: '/api/v1/account/settings',
	method: 'patch',
	tags: [
		'Account',
	],
	operationId: 'patchAccountSettingsUpdate',
};

export default async function patchAccountSettingsUpdateRequest (body: Request, options = {}) {
	const wrapped = client.wrapper(operation, body, options);
	wrapped.request(request);
	return wrapped.run();
}
