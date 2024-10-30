import Request from '../request';

let operations = {};

// run this here for SSR
operations = await require('./setup').setup(require('app/api/schema.json'));

export * as request from '../request';

async function rpcHandler (operationId, ...rest) {
	let body;
	let options;
	if (rest.length === 1) {
		options = rest[0];
	}
	if (rest.length > 1) {
		body = rest[0];
		options = rest[1];
	}
	if (operations?.[operationId]) {
		const { method, url } = operations[operationId];
		try {
			if (!['GET', 'HEAD'].includes(method.toUpperCase()) && operations[operationId].z) {
				const schema = require(`app/api/requests/${operationId.replace(/_/g, '-')}`);
				const { data, error } = schema[operationId].safeParse(body);
				if (error) {
					throw new Error(`Payload validation for ${operationId} failed.`, { cause: error });
				}
				body = data;
			}
			return Request(url, { method: method.toUpperCase(), body, ...options });
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
