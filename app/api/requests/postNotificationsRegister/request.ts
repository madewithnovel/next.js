// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const request = z.object({ endpoint: z.string().optional(), auth: z.string().optional(), key: z.string().optional() });
export type Request = z.infer<typeof request>

const operation = {
	url: '/api/v1/notifications/register',
	method: 'post',
	tags: [
		'Notification',
	],
	operationId: 'postNotificationsRegister',
};

export default async function postNotificationsRegisterRequest (body: Request, options = {}) {
	const wrapped = client.wrapper(operation, body, options);
	wrapped.request(request);
	return wrapped.run();
}
