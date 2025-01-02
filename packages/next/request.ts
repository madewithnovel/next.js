import { redirect } from 'next/navigation';

interface ErrorResponse {
	error: {
		code: string;
		message: string;
		context: Record<string, unknown>;
	}
}

interface TypedResponse<T> extends Response {
	json(): Promise<T & ErrorResponse>;
}

type RequestContext = {
	headers: Record<string, unknown>;
}

const passthrough: RequestContext = { headers: {} };

const isClient = typeof window !== 'undefined';

const history = [];

// const batch = []; // TODO: use for batching requests
/**
 * await Promise.all([
 *     request.get(),
 *     request.get(),
 * ])
 *
 * would send the request to api/v1/unstable_batch in one request
 */

export function getHistory () {
	if (process.env.NODE_ENV === 'production') {
		return [];
	}
	return history;
}

function setRequestContext ({ headers, cookies }) {
	if (headers) {
		passthrough.headers.referer = headers.get('referer');
		passthrough.headers['x-forwarded-for'] = headers.get('x-forwarded-for');
		passthrough.headers['x-forwarded-host'] = headers.get('x-forwarded-host');
	}
	if (cookies) {
		passthrough.headers.cookie = cookies.toString();
	}
}

type RequestOptions = {
	method?: string;
	headers?: Record<string, string>;
	body?: Record<string, unknown>;
	next?: {
		tags: string[];
	};
}

async function request (path, { method = 'GET', headers, body, next, ...overrides }: RequestOptions = {}) {
	// const agent: Agent = isClient ? undefined : new (await import('https')).Agent({ rejectUnauthorized: false });
	if (!isClient) {
		const { headers: scopedHeaders, cookies } = require('next/headers');
		setRequestContext({ headers: await scopedHeaders(), cookies: await cookies() });
	}
	history.push({ type: 'request', action: 'start', data: { url: process.env.NEXT_PUBLIC_API_HOST + path, method }, client: isClient });
	const response = await fetch(process.env.NEXT_PUBLIC_API_HOST + path, {
		credentials: 'include',
		method,
		mode: process.env.NEXT_PUBLIC_API_HOST === process.env.NEXT_PUBLIC_HOST ? 'same-origin' : 'cors',
		headers: {
			...passthrough.headers,
			'Content-Type': 'application/json',
			...headers,
		},
		body: body && !['GET', 'HEAD'].includes(method) ? JSON.stringify(body) : undefined,
		// agent,
		next: {
			tags: next?.tags ? next.tags : [],
		},
		...overrides,
	});

	if (process.env.NODE_ENV === 'development') {
		// const HISTORY_LIMIT = 20;
		const clonedResponse = response.clone();
		history.push({ type: 'request',
			action: 'end',
			data: { url: process.env.NEXT_PUBLIC_API_HOST + path,
				method,
				response: {
					headers: clonedResponse.headers,
					ok: clonedResponse.ok,
					status: clonedResponse.status,
					body: await clonedResponse.text(),
				},
			},
			client: isClient,
		});
		// TODO: history.reverse().slice(0, HISTORY_LIMIT);
	}

	switch (response.status) {
	case 401:
		if (['/auth/password'].includes(path)) {
			return response;
		}
		if (response.headers.getSetCookie()?.join(';')?.includes('user=;')) {
			if (!isClient) {
				return redirect('/auth/logout');
			}
			window.location.href = '/auth/logout';
			return;
		}
		if (!isClient) {
			return redirect('/login?error=NO_SESSION');
		}
		window.location.href = '/login?error=NO_SESSION';
		return;
	case 403: {
		const clone = response.clone();
		// TODO: forbidden, handle it from the caller and notify that they may not have the right permission
		const data = await clone.json();
		if (!isClient) {
			if (data.error?.context?.permission) {
				if (!isClient) {
					return redirect('/unauthorized?permission=' + data.error.context.permission);
				}
				window.location.href = '/unauthorized?permission=' + data.error.context.permission;
				return;
			}
		} else {
			if (data.error?.code === 'FST_CSRF_INVALID_TOKEN') {
				console.log('error', 'Operation cannot continue due to expired CSRF', 'Operation cannot continue because the CSRF used to protect this page is invalid. Please refresh the page.');
			}
		}
		return response;
	}
	default:
		return response;
	}
}

export const get = request.get = async (path, options = {}) => request(path, { ...options, method: 'GET' });
export const post = request.post = async (path, body, options = {}) => request(path, { ...options, body, method: 'POST' });
export const put = request.put = async (path, body, options = {}) => request(path, { ...options, body, method: 'PUT' });
export const patch = request.patch = async (path, body, options = {}) => request(path, { ...options, body, method: 'PATCH' });
export const del = request.delete = async (path, body, options = {}) => request(path, { ...options, body, method: 'DELETE' });

export default request;

export function wrapper <T> (operation, ...rest) {
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
	const { method, url, tags } = operation;
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
	let requestValidator;
	return {
		request: (schema) => {
			requestValidator = schema;
		},
		async run () {
			let requestOk = true;
			if (body && requestValidator) {
				requestOk = requestValidator.safeParse(body);
			}
			if (requestOk) {
				// TODO: validate
			}
			return (await request(urlWithParams, {
				method: method.toUpperCase(),
				body,
				...options,
				headers: {},
				next: {
					...options?.next,
					tags: [...(options?.next?.tags ?? []), ...(tags ?? [])],
				},
			})) as TypedResponse<T>;
		},
	};
}
