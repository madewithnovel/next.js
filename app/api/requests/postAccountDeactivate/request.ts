// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const request = z.object({ sudo_password: z.string() });
export type Request = z.infer<typeof request>

const operation = {
	url: '/api/v1/account/deactivate',
	method: 'post',
	tags: [
		'Account',
	],
	operationId: 'postAccountDeactivate',
};

export default async function postAccountDeactivateRequest (body: Request, options = {}) {
	const wrapped = client.wrapper(operation, body, options);
	wrapped.request(request);
	return wrapped.run();
}
