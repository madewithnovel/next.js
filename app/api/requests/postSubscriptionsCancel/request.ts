// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
import { z } from 'zod';

const operation = {
	url: '/api/v1/subscription/cancel',
	method: 'post',
	tags: [
		'Subscription',
	],
	operationId: 'postSubscriptionsCancel',
};

export default async function postSubscriptionsCancelRequest (options = {}) {
	const wrapped = client.wrapper(operation, options);

	return wrapped.run();
}
