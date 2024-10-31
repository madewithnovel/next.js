'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalErrorPage ({ error, reset }) {
	useEffect(() => {
		console.error(error);
		Sentry.captureException(error);
	}, [error]);

	return (
		<div className="h-screen w-full flex items-center justify-center">
			<div style={{ maxWidth: 600, minWidth: 480 }} className="flex flex-col gap-5 p-10">
				<h1 className="text-4xl font-medium">Uh oh! Something's wrong</h1>
				<p className="text-lg">There was an error that the application could not recognize. This will be reported to our administrators. In the meantime, you can try to reset this page by clicking the button below.</p>
				<div>
					<button onClick={() => reset()} className="button">Try again</button>
				</div>
			</div>
		</div>
	);
}
