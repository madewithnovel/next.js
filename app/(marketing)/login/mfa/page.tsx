import { LibraryBigIcon } from 'lucide-react';
import Link from 'next/link';

import Form from './form';

export default async function Page () {
	return (
		<div className="w-full md:w-1/2 min-h-screen mx-auto flex flex-col justify-start md:justify-center">
			<div
				className="flex flex-col justify-center mx-auto gap-5 p-10"
				style={{ width: 500 }}
			>
				<LibraryBigIcon size={42}/>
				<div>
					<div className="text-3xl font-medium">Enter your OTP</div>
				</div>
				<Form/>
			</div>
		</div>
	);
}

/**
 * Remove this if you want to use SSG for this page.
 *
 * We are keeping this in the marketing pages to ensure that they are always static.
 */
export const dynamic = 'force-static';
