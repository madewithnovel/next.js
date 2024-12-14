// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const request = z.object({ org_id: z.string().optional() });
export type Request = z.infer<typeof request>

const operation = {
	url: '/api/v1/session/switch',
	method: 'post',
	tags: [
		'Application',
	],
	operationId: 'postSessionSwitch',
};

export default async function postSessionSwitchRequest (body: Request, options = {}) {
	const wrapped = client.wrapper(operation, body, options);
	wrapped.request(request);
	return wrapped.run();
}
