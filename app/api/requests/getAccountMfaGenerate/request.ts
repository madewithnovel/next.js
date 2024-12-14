// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const response = z.object({ mfa: z.object({ qr: z.string().optional(), secret: z.string().optional(), remaining: z.number().int().optional(), expires_at: z.string().datetime({ offset: true }).optional() }).optional() });
export type Response = z.infer<typeof response>

const operation = {
	url: '/api/v1/account/mfa',
	method: 'get',
	tags: [
		'Account',
	],
	operationId: 'getAccountMfaGenerate',
};

export default async function getAccountMfaGenerateRequest (options = {}) {
	const wrapped = client.wrapper<Response>(operation, options);

	return wrapped.run();
}
