// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const request = z.object({ endpoint: z.array(z.string()).optional() });
export type Request = z.infer<typeof request>

const operation = {
	url: '/api/v1/notifications/archive',
	method: 'post',
	tags: [
		'Notification',
	],
	operationId: 'postNotificationsArchive',
};

export default async function postNotificationsArchiveRequest (body: Request, options = {}) {
	const wrapped = client.wrapper(operation, body, options);
	wrapped.request(request);
	return wrapped.run();
}
