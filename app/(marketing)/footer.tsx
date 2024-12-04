import { SparkleIcon } from 'lucide-react';
import Link from 'next/link';

export default function Footer () {
	return (
		<footer className="py-10 flex flex-col gap-10 mt-10 mb-20 footer">
			<div className="container flex gap-10 mx-auto px-10 md:px-20">
				<div className="w-1/4 hidden md:block">
					<Link href="/" className="flex items-center gap-2 text-xl font-medium">
						<SparkleIcon/>
						Novel
					</Link>
					<p className="text-stone-600 mt-5">
						With Novel, you’ve got all the flexibility to get the best out of your business.
					</p>
				</div>
				<div className="grid grid-cols-2 md:grid-cols-4 flex-1 gap-10">
					<div>
						<div className="font-medium mb-5">Product</div>
						<div>
							<div className="flex flex-col gap-2">
								<Link href="/">CRM</Link>
								<Link href="/">Workspaces</Link>
								<Link href="/">Pricing</Link>
								<Link href="/">API Docs</Link>
							</div>
						</div>
					</div>
					<div>
						<div className="font-medium mb-5">Features</div>
						<div className="flex flex-col gap-2">
							<Link href="/">Billing</Link>
							<Link href="/">Files</Link>
							<Link href="/">Workspaces</Link>
							<Link href="/">Payment Gateway</Link>
							<Link href="/">Collaboration</Link>
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
			<hr className="hidden md:block"/>
			<div className="hidden md:flex container gap-10 mx-auto px-20 text-sm">
				<div className="flex-1">
					<p className="text-stone-600">
						Copyright &copy; 2025 Novel by Marathon Digital
					</p>
				</div>
				<div className="flex divide-x divide-stone-200">
					<Link href="/legal/privacy" className="px-5">Privacy</Link>
					<Link href="/legal/terms" className="px-5">Terms</Link>
					<Link href="/legal/license" className="px-5">License</Link>
					<Link href="/legal/cookies" className="px-5">Cookies</Link>
				</div>
			</div>
		</footer>
	);
}
