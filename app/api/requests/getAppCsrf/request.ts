// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const response = z.object({ csrf: z.string().optional() });
export type Response = z.infer<typeof response>

const operation = {
	url: '/api/v1/csrf',
	method: 'get',
	tags: [
		'Application',
	],
	operationId: 'getAppCsrf',
};

export default async function getAppCsrfRequest (options = {}) {
	const wrapped = client.wrapper<Response>(operation, options);

	return wrapped.run();
}
