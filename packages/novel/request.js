import { redirect } from 'next/navigation';

const HISTORY_LIMIT = 20;
const passthrough = { headers: {} };

const isClient = typeof window !== 'undefined';
const agent = isClient ? undefined : (await import('https')).Agent({ rejectUnauthorized: false });

const history = [];

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

async function request (path, { method = 'GET', headers, body, next, ...overrides } = {}) {
	if (!isClient) {
		const { headers: scopedHeaders, cookies } = require('next/headers');
		setRequestContext({ headers: scopedHeaders(), cookies: cookies() });
	}
	history.push({ type: 'request', data: { url: process.env.NEXT_PUBLIC_API_HOST + path, method }, client: isClient });
	const current = history.length - 1;
	const response = await fetch(process.env.NEXT_PUBLIC_API_HOST + path, {
		credentials: 'include',
		method,
		headers: {
			...passthrough.headers,
			'Content-Type': 'application/json',
			...headers,
		},
		body: body && !['GET', 'HEAD'].includes(method) ? JSON.stringify(body) : undefined,
		agent,
		next: {
			tags: next?.tags ? next.tags : [],
		},
		...overrides,
	});

	if (process.env.NODE_ENV === 'development') {
		// import { utils } from 'novel/devtools';
		// TODO: should only be in dev
		const clonedResponse = response.clone();
		history[current].data = {
			...history[current].data,
			response: {
				headers: clonedResponse.headers,
				ok: clonedResponse.ok,
				status: clonedResponse.status,
				body: await clonedResponse.text(),
			},
		};
		// TODO: history.reverse().slice(0, HISTORY_LIMIT);
	}

	switch (response.status) {
	case 401:
		if (['/auth/password'].includes(path)) {
			return response;
		}
		if (!isClient) {
			if (response.headers.getSetCookie()?.join(';')?.includes('user=;')) {
				return redirect('/auth/logout');
			}
		}
		return redirect('/login?session=0');
	case 403: {
		const clone = response.clone();
		// TODO: forbidden, handle it from the caller and notify that they may not have the right permission
		const data = await clone.json();
		if (!isClient) {
			if (data.error?.context?.permission) {
				return redirect('/unauthorized?permission=' + data.error.context.permission);
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

export const get = request.get = async (path, options) => request(path, { ...options, method: 'GET' });
export const post = request.post = async (path, body, options) => request(path, { ...options, body, method: 'POST' });
export const put = request.put = async (path, body, options) => request(path, { ...options, body, method: 'PUT' });
export const patch = request.patch = async (path, body, options) => request(path, { ...options, body, method: 'PATCH' });
export const del = request.delete = async (path, body, options) => request(path, { ...options, body, method: 'DELETE' });

export default request;
