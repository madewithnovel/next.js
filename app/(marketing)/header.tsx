import Announcement from 'components/marketing/announcement';
import { BoxIcon, ChevronDownIcon } from 'lucide-react';
import Link from 'next/link';

export default function Header () {
	return (
		<>
			<Announcement>
				Novel 2024 &middot; Amsterdam and Berlin from June 7 – 9 to
				{' '}
				<Link href="/">see what’s coming next →</Link>
			</Announcement>
			<header
				className="py-5 bg-white fixed w-full z-20 navbar">
				<div className="container flex-center-between mx-auto px-10">
					<Link href="/" className="flex items-center gap-2 text-xl font-medium">
						<BoxIcon/>
						Novel
					</Link>
					<nav className="flex items-center gap-1">
						<Link href="/features" className="p-5 font-medium">Features</Link>
						<Link href="/pricing" className="p-5 font-medium">Pricing</Link>
						<div className="group">
							<Link href="/pricing" className="p-5 flex items-center gap-2 font-medium">
								Resources <ChevronDownIcon/>
							</Link>
							<div
								className="opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all absolute w-full left-0 bg-white border-y border-stone-200">
								<div className="container mx-auto grid grid-cols-3">
									<div className="border-r border-stone-200 p-10">
										<div className="text-lg font-medium">Blog</div>
										<div className="mt-5">
											<div className="h-40 bg-stone-200 rounded"></div>
										</div>
									</div>
									<div className="col-span-2 py-10 px-5 grid grid-cols-3">
										<div className="flex flex-col">
											<div className="font-medium px-5 py-2">Team</div>
											<Link href="/pricing" className="px-5 py-1">Marketing</Link>
											<Link href="/pricing" className="px-5 py-1">Leaders</Link>
											<Link href="/pricing" className="px-5 py-1">IT</Link>
										</div>
										<div className="flex flex-col">
											<div className="font-medium px-5 py-2">Learn more</div>
											<Link href="/pricing" className="px-5 py-1">Blog</Link>
											<Link href="/pricing" className="px-5 py-1">Events and webinars</Link>
											<Link href="/pricing" className="px-5 py-1">Guides</Link>
											<Link href="/pricing" className="px-5 py-1">Customer stories</Link>
										</div>
										<div className="flex flex-col">
											<div className="font-medium px-5 py-2">Get help</div>
											<Link href="/pricing" className="px-5 py-1">Developer Resources</Link>
											<Link href="/pricing" className="px-5 py-1">Help Center</Link>
											<Link href="/pricing" className="px-5 py-1">Community</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
						<Link href="/login" className="button link font-medium">Sign in</Link>
					</nav>
					<div>
						<Link href="/start?plan=02-novel-freemium"
							className="button action font-medium">Try for
							free</Link>
					</div>
				</div>
			</header>
		</>
	);
}
