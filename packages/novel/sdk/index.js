import Request from '../request';

let operations = {};

// run this here for SSR
operations = await require('./setup').setup(require('app/api/schema.json'));

export * as request from '../request';

export function path (pathname = '/') {
	const url = new URL(process.env.NEXT_PUBLIC_API_HOST + pathname);
	return url.toString();
}

async function rpcHandler (operationId, ...rest) {
	let params = rest?.params ?? [];
	let options = {};
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
			if (!['GET', 'HEAD'].includes(method.toUpperCase()) && operations[operationId].z) {
				const schema = require(`app/api/requests/${operationId.replace(/_/g, '-')}`);
				const { data, error } = schema[operationId].safeParse(body);
				if (error) {
					throw new Error(`Payload validation for ${operationId} failed.`, { cause: error });
				}
				body = data;
			}
			let urlWithParams = url;
			let touched = 0;
			url.split('/').forEach((part) => {
				if (part.startsWith('{') && part.endsWith('}')) {
					urlWithParams = urlWithParams.replace(part, params[touched]);
					touched++;
				}
			});
			return Request(urlWithParams, {
				method: method.toUpperCase(),
				body,
				...options,
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
	get: function (_, prop) {
		return (...params) => rpcHandler(prop, ...params);
	},
});
