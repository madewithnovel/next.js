// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

const operation = {
	url: '/session/end',
	method: 'get',
	tags: [
		'Session',
	],
	operationId: 'getSessionEnd',
};

export default async function getSessionEndRequest (options = {}) {
	const wrapped = client.wrapper(operation, options);

	return wrapped.run();
}
