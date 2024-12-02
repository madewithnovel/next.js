'use client';

import { ChevronDownIcon, LibraryBigIcon, MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import AnnouncementBanner from './components/announcement/banner';

export default function Header () {
	const [mobileNavOpen, toggle] = useState(false);

	function toggleNav (state) {
		document.documentElement.style.overflow = state === true ? 'hidden' : 'auto';
		toggle(state);
	}

	return (
		<>
			<AnnouncementBanner>
				Novel 2025 &middot; Amsterdam and Berlin from June 7 – 9 to <Link href="/">see what’s coming next →</Link>
			</AnnouncementBanner>
			<header className="block sticky top-0 md:hidden z-20 w-full bg-white relative">
				<div className="py-5 px-5 md:px-10 flex items-center justify-between">
					<div>
						<Link href="/" className="flex items-center gap-2 text-xl">
							<LibraryBigIcon/>
							<span className="font-medium">Novel</span>
						</Link>
					</div>
					<div>
						<button onClick={() => toggleNav(!mobileNavOpen)}>
							<MenuIcon/>
						</button>
					</div>
				</div>
				{mobileNavOpen && (
					<div className="absolute h-screen w-full z-30 bg-white/80 backdrop-blur">
						<nav className="flex flex-col *:w-full items-center p-5" onClick={() => toggleNav(!mobileNavOpen)}>
							<Link href="/features" className="p-5">Features</Link>
							<Link href="/pricing" className="p-5">Pricing</Link>
							<div className="group py-5">
								<Link href="/features" className="p-5 text-nowrap flex-nowrap ">
									Resources <ChevronDownIcon className="inline-flex"/>
								</Link>
								<div className="mt-5">
									<div className="col-span-2 grid grid-cols-3">
										<div className="flex flex-col">
											<div className="font-medium px-5 py-2">Team</div>
											<Link href="/" className="px-5 py-1">Marketing</Link>
											<Link href="/" className="px-5 py-1">Leaders</Link>
											<Link href="/" className="px-5 py-1">IT</Link>
										</div>
										<div className="flex flex-col">
											<div className="font-medium px-5 py-2">Learn more</div>
											<Link href="/" className="px-5 py-1">Blog</Link>
											<Link href="/" className="px-5 py-1">Events and webinars</Link>
											<Link href="/" className="px-5 py-1">Guides</Link>
											<Link href="/" className="px-5 py-1">Customer stories</Link>
										</div>
										<div className="flex flex-col">
											<div className="font-medium px-5 py-2">Get help</div>
											<Link href="/" className="px-5 py-1">Developer Resources</Link>
											<Link href="/" className="px-5 py-1">Help Center</Link>
											<Link href="/" className="px-5 py-1">Community</Link>
										</div>
									</div>
								</div>
							</div>
							<Link href="/login" className="button secondary mb-5">Sign-in</Link>
							<Link href="/signup" className="button primary">Get Started</Link>
						</nav>
					</div>
				)}
			</header>
			<header className="hidden md:block px-20 bg-white sticky top-0 w-full z-20">
				<div className="container py-1 px-14 mx-auto flex items-center justify-between gap-10">
					<div>
						<Link href="/" className="flex items-center gap-2 text-xl">
							<LibraryBigIcon/>
							<span className="font-medium">Novel</span>
						</Link>
					</div>
					<nav className="flex items-center gap-1">
						<Link href="/features" className="p-5">Features</Link>
						<div className="group">
							<Link href="/features" className="py-5 px-5 pr-1 text-nowrap flex-nowrap ">
								Resources <ChevronDownIcon className="inline-flex"/>
							</Link>
							<div className="mt-5 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all absolute w-full left-0 bg-white border-y border-stone-200">
								<div className="container px-32 mx-auto grid grid-cols-3">
									<div className="border-r border-stone-200 p-10">
										<div className="text-lg font-medium">Blog</div>
										<div className="mt-5">
											<Link href="/" className="block h-40 bg-stone-200 rounded"></Link>
										</div>
									</div>
									<div className="col-span-2 py-10 px-5 grid grid-cols-3">
										<div className="flex flex-col">
											<div className="font-medium px-5 py-2">Team</div>
											<Link href="/" className="px-5 py-1">Marketing</Link>
											<Link href="/" className="px-5 py-1">Leaders</Link>
											<Link href="/" className="px-5 py-1">IT</Link>
										</div>
										<div className="flex flex-col">
											<div className="font-medium px-5 py-2">Learn more</div>
											<Link href="/" className="px-5 py-1">Blog</Link>
											<Link href="/" className="px-5 py-1">Events and webinars</Link>
											<Link href="/" className="px-5 py-1">Guides</Link>
											<Link href="/" className="px-5 py-1">Customer stories</Link>
										</div>
										<div className="flex flex-col">
											<div className="font-medium px-5 py-2">Get help</div>
											<Link href="/" className="px-5 py-1">Developer Resources</Link>
											<Link href="/" className="px-5 py-1">Help Center</Link>
											<Link href="/" className="px-5 py-1">Community</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
						<Link href="/pricing" className="p-5">Pricing</Link>
						<Link href="/login" className="button secondary">Sign-in</Link>
					</nav>
					<div>
						<Link href="/signup" className="button primary">Get Started</Link>
					</div>
				</div>
			</header>
		</>
	);
}
