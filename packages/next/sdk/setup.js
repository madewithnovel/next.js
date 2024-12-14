exports.loadOperations = function (exportedOutside) {
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
};

// can be ran in server/client
exports.setup = async function () {
	if (process.env.NODE_ENV === 'development' && typeof window === 'undefined' && process.env.NEXT_PRIVATE_TRACE_ID) {
		const fs = require('fs');
		const path = require('path');
		if (fs.existsSync('.next/novel')) {
			const traceId = fs.readFileSync('.next/novel', 'utf-8');
			if (traceId === process.env.NEXT_PRIVATE_TRACE_ID) {
				return;
			}
		}
		fs.writeFileSync('.next/novel', process.env.NEXT_PRIVATE_TRACE_ID);
		console.info('[DEVELOPMENT] Setting up request wrappers.');
		fs.mkdirSync(path.join(process.cwd(), 'app/api/requests'), { recursive: true });
		fs.mkdirSync(path.join(process.cwd(), 'app/api/entities'), { recursive: true });
		let body;
		try {
			const response = await fetch(process.env.NEXT_PUBLIC_API_HOST + '/docs/openapi/json');
			if (response.ok) {
				body = await response.json();
				fs.writeFileSync(path.join(process.cwd(), 'app/api/schema.json'), JSON.stringify(body, null, 2));
			} else {
				console.error('[DEVELOPMENT] Failed to fetch from Server. Please turn on the Novel server and try again. Else you will not be able to get the latest API operations from development.');
				body = require('app/api/schema.json');
			}
		} catch {
			console.error('[DEVELOPMENT] Failed to fetch from Server. Please turn on the Novel server and try again. Else you will not be able to get the latest API operations from development.');
			body = require('app/api/schema.json');
		}

		const { paths, components } = body;

		const { jsonSchemaToZod } = require('json-schema-to-zod');
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
		for (const [url, methods] of Object.entries(paths)) {
			for (const [method, op] of Object.entries(methods)) {
				const { jsonSchemaToZod } = require('json-schema-to-zod');
				let bodyZod;
				let responseZod;
				if (op?.requestBody?.content?.['application/json']?.schema) {
					const schema = op.requestBody.content['application/json'].schema;
					bodyZod = jsonSchemaToZod(schema, { name: 'request', module: 'esm', noImport: true, type: true });
				}
				if (op?.responses?.['200']?.content?.['application/json']?.schema) {
					const schema = op.responses['200'].content['application/json'].schema;
					responseZod = jsonSchemaToZod(schema, { name: 'response', noImport: true, module: 'esm', type: true });
				}

				const params = [];
				if (op?.parameters?.length > 0) {
					op.parameters.forEach((_, i) => {
						params.push(`param${i}: string`);
					});
				}
				if (!['GET', 'HEAD'].includes(method) && bodyZod) {
					params.push('body: Request');
				}

				const wrapper = `
// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';
${(bodyZod || responseZod) ? 'import { z } from \'zod\'' : ''};
${bodyZod !== undefined ? bodyZod : ''}
${responseZod !== undefined ? responseZod : ''}
const operation = ${JSON.stringify({ url, method, tags: op.tags, operationId: op.operationId }, null, 2)};
	
export default async function ${op.operationId}Request(${params.length > 0 ? params.join(', ') + ', ' : ''}options = {}) {
	const wrapped = client.wrapper${responseZod !== undefined ? '<Response>' : ''}(operation, ${params.length > 0 ? params.map(r => r.split(':')[0]).join(', ') + ', ' : ''}options);
	${bodyZod !== undefined ? 'wrapped.request(request);' : ''}
	return wrapped.run();
}`.trim();
				fs.mkdirSync(path.join(process.cwd(), 'app/api/requests', `${op.operationId.replace(/_/g, '-')}`), { recursive: true });
				fs.writeFileSync(path.join(process.cwd(), 'app/api/requests', `${op.operationId.replace(/_/g, '-')}/request.ts`), wrapper);

				if (!fs.existsSync(path.join(process.cwd(), 'app/api/requests', `${op.operationId.replace(/_/g, '-')}/index.ts`))) {
					const exported = `
// YOU MAY MODIFY THIS FILE
import request from './request';

export * from './request';

export default request;
							`.trim();
					fs.writeFileSync(path.join(process.cwd(), 'app/api/requests', `${op.operationId.replace(/_/g, '-')}/index.ts`), exported);
				}
			}
		}

		const { exec } = require('child_process');
		exec(`eslint ${path.join(process.cwd(), 'app/api/requests')} --fix`);
	}
};
