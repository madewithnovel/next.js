// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

const operation = {
	url: '/auth/{strategy}/callback',
	method: 'get',
	tags: [
		'Auth',
	],
	operationId: 'getAuthCallback',
};

export default async function getAuthCallbackRequest (param0: string, options = {}) {
	const wrapped = client.wrapper(operation, param0, options);

	return wrapped.run();
}
