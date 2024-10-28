import Request from '../request';

const operations = {};

export async function rpc (operationId, body, options) {
	if (operations?.[operationId]) {
		const { method, url } = operations[operationId];
		try {
			return Request(url, { method: method.toUpperCase(), body, ...options });
		} catch (error) {
			console.error(`RPC error for ${operationId}`, error);
			throw error;
		}
	}
	console.warn(`RPC operation ${operationId} not found`);
}

// TODO: create this and store in web/public on next build
(async function setupRpc () {
	if (Object.keys(operations).length === 0) {
		try {
			const response = await fetch(process.env.NEXT_PUBLIC_API_HOST + '/docs/openapi/json');
			const { paths } = await response.json();
			Object.entries(paths).forEach(([url, methods]) => {
				Object.entries(methods).forEach(([method, op]) => {
					operations[op.operationId] = {
						url,
						method,
						...op,
						z: {}, // TODO: create ZOD
					};
					operations[op.operationId.toLowerCase()] = operations[op.operationId];
					operations[op.operationId.replace(method, '')] = operations[op.operationId];
					operations[op.operationId.replace(method, '').toLowerCase()] = operations[op.operationId];
				});
			});
		} catch {

		}
	}
})();
