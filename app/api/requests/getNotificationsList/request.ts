// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const response = z.object({ notifications: z.array(z.object({ id: z.string().optional(), author_id: z.string().optional(), received_at: z.string().optional(), read: z.boolean().optional(), title: z.string().optional(), body: z.string().optional(), icon: z.string().optional(), level: z.string().optional(), metadata: z.record(z.any()).optional() })).optional(), invites: z.array(z.object({ invitation_code: z.string().optional(), organization: z.object({ id: z.string().optional(), name: z.string().optional() }).optional(), created_at: z.string().optional(), expires_at: z.string().optional(), expired: z.boolean().optional() })).optional() });
export type Response = z.infer<typeof response>

const operation = {
	url: '/api/v1/notifications',
	method: 'get',
	tags: [
		'Notification',
	],
	operationId: 'getNotificationsList',
};

export default async function getNotificationsListRequest (options = {}) {
	const wrapped = client.wrapper<Response>(operation, options);

	return wrapped.run();
}
