// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

const operation = {
	url: '/auth/passwordless/verify',
	method: 'get',
	tags: [
		'Auth',
	],
	operationId: 'getAuthPasswordless',
};

export default async function getAuthPasswordlessRequest (options = {}) {
	const wrapped = client.wrapper(operation, options);

	return wrapped.run();
}
