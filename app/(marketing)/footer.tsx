import { BoxIcon } from 'lucide-react';
import Link from 'next/link';

export default function Footer () {
	return (
		<footer className="py-10 flex flex-col gap-10 mt-10 mb-20 footer">
			<div className="container flex gap-10 mx-auto px-10">
				<div className="w-1/4">
					<Link href="/" className="flex items-center gap-2 text-xl font-medium">
						<BoxIcon/>
						Novel
					</Link>
					<p className="text-stone-600 mt-5">
						With Novel, you’ve got all the flexibility to work when, where and how it’s best for you.
					</p>
				</div>
				<div className="grid grid-cols-4 flex-1 gap-10">
					<div>
						<div className="font-medium mb-5">Product</div>
						<div>
							<div className="flex flex-col gap-2">
								<Link href="/">Chat</Link>
								<Link href="/">Workspaces</Link>
								<Link href="/">Pricing</Link>
								<Link href="/">API Docs</Link>
							</div>
						</div>
					</div>
					<div>
						<div className="font-medium mb-5">Features</div>
						<div className="flex flex-col gap-2">
							<Link href="/">Messaging</Link>
							<Link href="/">Billing</Link>
							<Link href="/">Files</Link>
							<Link href="/">Collaboration</Link>
							<Link href="/">Video Calls</Link>
							<Link href="/">Workspaces</Link>
						</div>
					</div>
					<div>
						<div className="font-medium mb-5">Legal</div>
						<div className="flex flex-col gap-2">
							<Link href="/legal/privacy">Privacy</Link>
							<Link href="/legal/terms">Terms of Use</Link>
							<Link href="/legal/license">License</Link>
							<Link href="/legal/cookies">Cookies</Link>
						</div>
					</div>
					<div>
						<div className="font-medium mb-5">Company</div>
						<div className="flex flex-col gap-2">
							<Link href="/">About us</Link>
							<Link href="/">Careers</Link>
							<Link href="/">Blog</Link>
							<Link href="/">Press Release</Link>
						</div>
					</div>
				</div>
			</div>
			<hr/>
			<div className="container flex gap-10 mx-auto px-10 text-sm">
				<div className="flex-1">
					<p className="text-stone-600">
						Copyright &copy; 2024 Novel by Marathon Digital
					</p>
				</div>
				<div className="flex divide-x divide-stone-200">
					<Link href="/legal/privacy" className="text-stone-600 px-10">Privacy</Link>
					<Link href="/legal/terms" className="text-stone-600 px-10">Terms</Link>
					<Link href="/legal/license" className="text-stone-600 px-10">License</Link>
					<Link href="/legal/cookies" className="text-stone-600 pl-10">Cookies</Link>
				</div>
			</div>
		</footer>
	);
}
