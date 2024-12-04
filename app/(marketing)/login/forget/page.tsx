import { SparkleIcon } from 'lucide-react';

import Form from './form';

export default async function Page () {
	return (
		<div className="w-full md:w-1/2 min-h-screen mx-auto flex flex-col justify-start md:justify-center">
			<div className="flex flex-col justify-center mx-auto gap-5 p-10" style={{ minWidth: 300, maxWidth: 500 }}>
				<SparkleIcon size={42}/>
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
