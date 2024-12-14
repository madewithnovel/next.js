// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const response = z.object({ events: z.array(z.any()).optional() });
export type Response = z.infer<typeof response>

const operation = {
	url: '/api/v1/account/events',
	method: 'get',
	tags: [
		'Account',
	],
	operationId: 'getAccountEvents',
};

export default async function getAccountEventsRequest (options = {}) {
	const wrapped = client.wrapper<Response>(operation, options);

	return wrapped.run();
}
