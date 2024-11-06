export function loadOperations (exportedOutside) {
	const operations = {};
	const { paths } = exportedOutside ?? {};
	Object.entries(paths).forEach(([url, methods]) => {
		Object.entries(methods).forEach(async ([method, op]) => {
			if (!url.includes('/webhook')) {
				operations[op.operationId] = {
					url,
					method,
					...op,
				};
				operations[op.operationId.toLowerCase()] = operations[op.operationId];
				operations[op.operationId.replace(method, '')] = operations[op.operationId];
				operations[op.operationId.replace(method, '').toLowerCase()] = operations[op.operationId];
			}
		});
	});
	return operations;
}

// can be ran in server/client
export async function setup (exportedOutside) {
	let operations = {};
	if (process.env.NODE_ENV === 'development' && typeof window === 'undefined') {
		// TODO: runs 3 times on dev server
		try {
			const response = await fetch(process.env.NEXT_PUBLIC_API_HOST + '/docs/openapi/json');
			if (response.ok) {
				const body = await response.json();
				if (typeof window === 'undefined') {
					const fs = await import('fs');
					const path = await import('path');
					fs.writeFileSync(path.join(process.cwd(), 'app/api/schema.json'), JSON.stringify(body, null, 2));
				}
				const { paths, components } = body;
				if (typeof window === 'undefined') {
					// sync into app/api
					const fs = await import('fs');
					const path = await import('path');
					const { jsonSchemaToZod } = await import('json-schema-to-zod');
					Object.entries(components.schemas).forEach(([id, schema]) => {
						if (!id.includes('def-')) {
							Object.entries(schema.properties).forEach(([id, childSchema]) => {
								if (childSchema.oneOf) {
									delete schema.properties[id];
								}
							});
							const compiledZod = jsonSchemaToZod(schema, { name: schema.title, module: 'esm', type: true });
							fs.writeFileSync(path.join(process.cwd(), 'app/api/entities', `${schema.title.replace(/_/g, '-')}.ts`), compiledZod);
						}
					});
				}
				for (const [url, methods] of Object.entries(paths)) {
					for (const [method, op] of Object.entries(methods)) {
						if (op?.requestBody?.content?.['application/json']?.schema) {
							const schema = op.requestBody.content['application/json'].schema;
							if (typeof window === 'undefined') {
								// sync into app/api
								const fs = await import('fs');
								const path = await import('path');
								const { jsonSchemaToZod } = await import('json-schema-to-zod');
								const compiledZod = jsonSchemaToZod(schema, { name: op.operationId, module: 'esm', type: true });
								fs.writeFileSync(path.join(process.cwd(), 'app/api/requests', `${op.operationId.replace(/_/g, '-')}.ts`), compiledZod);
							}
						}
						if (!url.includes('/webhook')) {
							operations[op.operationId] = {
								url,
								method,
								...op,
							};
							operations[op.operationId.toLowerCase()] = operations[op.operationId];
							operations[op.operationId.replace(method, '')] = operations[op.operationId];
							operations[op.operationId.replace(method, '').toLowerCase()] = operations[op.operationId];
						}
					}
				}
			} else {
				console.error('[DEVELOPMENT] Failed to fetch from Server. Please turn on the Novel server and try again. Else you will not be able to get the latest API operations from development.');
			}
		} catch (error) {
			console.error('[DEVELOPMENT] Failed to fetch from Server. Please turn on the Novel server and try again. Else you will not be able to get the latest API operations from development.');
			console.error(error);
		}
	} else {
		operations = loadOperations(exportedOutside);
	}
	return operations;
}
