import schema from 'app/api/schema.json';

import Request from '../request';
import { loadOperations } from './setup';

const operations = loadOperations(schema);

export * as request from '../request';

export function path (pathname = '/') {
	const url = new URL(process.env.NEXT_PUBLIC_API_HOST + pathname);
	return url.toString();
}

async function rpcHandler (operationId, ...rest) {
	let params;
	let options = { next: { tags: [] } };
	let body;
	if (rest.length === 1) {
		body = rest[0];
	}
	if (rest.length === 2) {
		if (Array.isArray(rest[0]) || typeof rest[0] !== 'object') {
			params = rest[0];
			body = rest[1];
		} else {
			params = [];
			body = rest[0];
			options = rest[1];
		}
	}
	if (rest.length === 3) {
		params = rest[0];
		body = rest[1];
		options = rest[2];
	}
	if (!Array.isArray(params)) {
		params = [params];
	}
	if (operations?.[operationId]) {
		const { method, url, tags } = operations[operationId];
		try {
			// if (!['GET', 'HEAD'].includes(method.toUpperCase()) && operations[operationId].requestBody) {
			// 	const schema = require(`app/api/requests/${operationId.replace(/_/g, '-')}`);
			// 	const { data, error } = schema[operationId].safeParse(body);
			// 	if (error) {
			// 		throw new Error(`Payload validation for ${operationId} failed.`, { cause: error });
			// 	}
			// 	body = data;
			// }
			let urlWithParams = url;
			let touched = 0;
			url.split('/').forEach((part) => {
				if (part.startsWith('{') && part.endsWith('}')) {
					urlWithParams = urlWithParams.replace(part, params[touched]);
					touched++;
				}
			});
			if (!['GET', 'HEAD'].includes(method.toUpperCase()) && (!body || Object.keys(body).length === 0)) {
				body = {};
			}
			return Request(urlWithParams, {
				method: method.toUpperCase(),
				body,
				...options,
				headers: {},
				next: {
					...options?.next,
					tags: [...(options?.next?.tags ?? []), ...(tags ?? [])],
				},
			});
		} catch (error) {
			console.error(`RPC error for ${operationId}`, error);
			throw error;
		}
	}
	console.warn(`RPC operation ${operationId} not found`);
}

export const rpc = new Proxy(rpcHandler, {
	get: function (_, prop: string) {
		// NOTE: this is used because we have shorthands for non method operationIds
		const similar = operations ? Object.keys(operations).find((key) => key.includes(prop)) : null;
		return (...params) => rpcHandler(similar, ...params);
	},
});
