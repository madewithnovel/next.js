'use server';

import { headers } from 'novel/next';

export default function Link({...props, children, href}) {
	const hasLocale = headers.get('x-locale');
	const newHref = hasLocale ? `/${hasLocale}${href}` : href;
	return <Link {...props} href={newHref}>{children}</Link>
}
