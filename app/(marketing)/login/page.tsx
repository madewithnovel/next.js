import { SparkleIcon } from 'lucide-react';
import Link from 'next/link';

import Form from './form';

export default async function Page () {
	return (
		<div className="w-full md:w-1/2 min-h-screen mx-auto flex flex-col justify-start md:justify-center">
			<div
				className="flex flex-col justify-center mx-auto gap-5 p-10"
				style={{ minWidth: 300, maxWidth: 500 }}
			>
				<SparkleIcon size={42}/>
				<div>
					<div className="text-3xl font-medium">Login to Novel</div>
				</div>
				<Form/>
				<div>
					<div>Need an account? <Link href="/signup">Sign up with your email</Link></div>
					<div>Login without a password? <Link href="/login/link">Use a Magic Link</Link></div>
				</div>
				<div className="text-sm">
					By signing-in, you agree to Novel's <Link href="/legal/terms">Terms of Use</Link>
					{' '}
					and consent to Novel's <Link href="/legal/privacy">Privacy Statement</Link>.
				</div>
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
