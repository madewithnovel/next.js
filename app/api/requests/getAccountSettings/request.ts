// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const response = z.object({ settings: z.record(z.any()).optional() });
export type Response = z.infer<typeof response>

const operation = {
	url: '/api/v1/account/settings',
	method: 'get',
	tags: [
		'Account',
	],
	operationId: 'getAccountSettings',
};

export default async function getAccountSettingsRequest (options = {}) {
	const wrapped = client.wrapper<Response>(operation, options);

	return wrapped.run();
}
