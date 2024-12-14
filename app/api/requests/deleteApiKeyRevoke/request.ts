// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const request = z.object({ access_id: z.string().optional() });
export type Request = z.infer<typeof request>

const operation = {
	url: '/api/v1/api-keys',
	method: 'delete',
	tags: [
		'Keys',
	],
	operationId: 'deleteApiKeyRevoke',
};

export default async function deleteApiKeyRevokeRequest (body: Request, options = {}) {
	const wrapped = client.wrapper(operation, body, options);
	wrapped.request(request);
	return wrapped.run();
}
