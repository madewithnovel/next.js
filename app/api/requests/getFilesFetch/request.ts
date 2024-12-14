// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

export const response = z.string().base64().describe('File is present.');
export type Response = z.infer<typeof response>

const operation = {
	url: '/files/{key}',
	method: 'get',
	tags: [
		'Files',
	],
	operationId: 'getFilesFetch',
};

export default async function getFilesFetchRequest (param0: string, options = {}) {
	const wrapped = client.wrapper<Response>(operation, param0, options);

	return wrapped.run();
}
