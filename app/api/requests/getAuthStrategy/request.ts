// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const response = z.object({ redirect_to: z.string().optional() }).describe('Authentication successful. Redirecting to next step...');
export type Response = z.infer<typeof response>

const operation = {
	url: '/auth/{strategy}',
	method: 'get',
	tags: [
		'Auth',
	],
	operationId: 'getAuthStrategy',
};

export default async function getAuthStrategyRequest (param0: string, options = {}) {
	const wrapped = client.wrapper<Response>(operation, param0, options);

	return wrapped.run();
}
