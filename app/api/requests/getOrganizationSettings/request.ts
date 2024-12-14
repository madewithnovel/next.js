// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const response = z.record(z.any());
export type Response = z.infer<typeof response>

const operation = {
	url: '/api/v1/organization/settings',
	method: 'get',
	tags: [
		'Organization',
	],
	operationId: 'getOrganizationSettings',
};

export default async function getOrganizationSettingsRequest (options = {}) {
	const wrapped = client.wrapper<Response>(operation, options);

	return wrapped.run();
}
