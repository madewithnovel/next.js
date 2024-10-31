import { LibraryBigIcon } from 'lucide-react';

import Form from './form';

export default async function Page () {
	return (
		<main className="flex">
			<div className="bg-black w-1/2">
				<div className="p-10 text-white">
					<LibraryBigIcon size={42}/>
				</div>
			</div>
			<div className="w-1/2 min-h-screen flex flex-col justify-center">
				<div className="flex flex-col justify-center mx-20 gap-5 p-10" style={{ minWidth: 300, maxWidth: 500 }}>
					<Form/>
				</div>
			</div>
		</main>
	);
}

/**
 * Remove this if you want to use SSG for this page.
 *
 * We are keeping this in the marketing pages to ensure that they are always static.
 */
export const dynamic = 'force-static';
