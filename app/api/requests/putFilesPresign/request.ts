// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const request = z.object({ key: z.string(), type: z.string() });
export type Request = z.infer<typeof request>

export const response = z.object({ file: z.object({ presigned_url: z.string().describe('The Pre signed URL that can be used for the operation').optional(), public: z.boolean().optional(), type: z.string().optional(), original: z.string().optional(), key: z.string().optional(), asset_url: z.string().describe('The URL to the asset').optional() }).optional() }).describe('Pre signed URL');
export type Response = z.infer<typeof response>

const operation = {
	url: '/api/v1/files/presign',
	method: 'put',
	tags: [
		'Files',
	],
	operationId: 'putFilesPresign',
};

export default async function putFilesPresignRequest (body: Request, options = {}) {
	const wrapped = client.wrapper<Response>(operation, body, options);
	wrapped.request(request);
	return wrapped.run();
}
