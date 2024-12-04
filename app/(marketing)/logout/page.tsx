import { SparkleIcon } from 'lucide-react';
import Link from 'next/link';

export default async function Page () {
	return (
		<div className="w-full md:w-1/2 min-h-screen mx-auto flex flex-col justify-start md:justify-center">
			<div
				className="flex flex-col justify-center mx-auto gap-5 p-10"
				style={{ minWidth: 300, maxWidth: 500 }}
			>
				<SparkleIcon size={42}/>
				<div>
					<div className="text-3xl font-medium">You've been logged out</div>
					<p className="text-muted-foreground">We hope to see you again!</p>
				</div>
				<Link href="/login" className="button w-full">Sign-in again</Link>
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
