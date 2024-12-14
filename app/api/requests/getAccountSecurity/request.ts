// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const response = z.object({ profile: z.object({ id: z.string().optional(), email: z.string().email().optional(), password: z.boolean().optional(), verified: z.boolean().optional(), metadata: z.record(z.any()).optional() }).optional(), mfa: z.union([z.null(), z.string().datetime({ offset: true })]).optional(), sessions: z.array(z.record(z.any())).optional() });
export type Response = z.infer<typeof response>

const operation = {
	url: '/api/v1/account/security',
	method: 'get',
	tags: [
		'Account',
	],
	operationId: 'getAccountSecurity',
};

export default async function getAccountSecurityRequest (options = {}) {
	const wrapped = client.wrapper<Response>(operation, options);

	return wrapped.run();
}
