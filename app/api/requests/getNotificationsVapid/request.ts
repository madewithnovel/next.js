// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const response = z.object({ vapid_key: z.string().optional() });
export type Response = z.infer<typeof response>

const operation = {
	url: '/api/v1/notifications/register',
	method: 'get',
	tags: [
		'Notification',
	],
	operationId: 'getNotificationsVapid',
};

export default async function getNotificationsVapidRequest (options = {}) {
	const wrapped = client.wrapper<Response>(operation, options);

	return wrapped.run();
}
