import { BoxIcon } from 'lucide-react';
import Link from 'next/link';

import Form from './form';

export default async function Page () {
	return (
		<main className="h-screen flex">
			<div className="bg-black w-1/2 flex flex-col">
				<div className="p-10 text-white">
					<BoxIcon size={42}/>
				</div>
			</div>
			<div className="w-1/2 min-h-screen flex flex-col justify-center">
				<div className="flex flex-col justify-center mx-20 gap-5 p-10" style={{ minWidth: 300, maxWidth: 500 }}>
					<div>
						<div className="text-3xl font-medium">Create your account</div>
						<p className="text-lg">
							Please provide a business email if you have one
						</p>
					</div>
					<Form/>
					<div>Have an account? <Link href="/login">Sign in with your email</Link></div>
					<div className="font-light">
						By creating an account, you agree to Novel's <Link href="/legal/terms">Terms of Use</Link>{' '}
						and consent to Novel's <Link href="/legal/privacy">Privacy Statement</Link>.
					</div>
				</div>
			</div>
		</main>
	);
}
