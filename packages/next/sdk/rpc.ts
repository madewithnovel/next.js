import types from 'app/api/requests';
import schema from 'app/api/schema.json';

import Request from '../request';

const operations = {};
Object.keys(schema.paths).forEach((url) => {
	const path = schema.paths[url];
	Object.keys(path).forEach((method) => {
		const operation = path[method];
		const matches = [...url.matchAll(/{(.*?)}/g)];
		const params = matches.map(match => match[1]);
		operations[operation.operationId] = {
			url,
			method,
			params,
			body: operation?.requestBody?.content?.['application/json']?.schema,
			...operation,
		};
	});
});

async function handler (operationId, ...rest, options = {}) {
	// console.log(operationId);
	const { method, url, tags } = operations[operationId];
	// if params available
	// if body is available

	// if response is available

	return null;
}

type typedOperations = typeof types;

type RPC = {
	[K in keyof typedOperations]: (
		operationId: K,
		...rest: Parameters<typeof handler>
	) => ReturnType<typeof handler>;
};

export const rpc: RPC = operations;

// export const rpc = new Proxy(handler, {
// 	get: function (_, prop: string) {
// 		// NOTE: this is used because we have shorthands for non method operationIds
// 		const similar = operations ? Object.keys(operations).find((key) => key.includes(prop)) : null;
// 		return (...rest, options = {}) => handler(similar, ...rest, options);
// 	},
// }) as RPC;
