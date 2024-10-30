import AnnouncementSmall from 'components/marketing/announcement/small';
import TestimonialLogos from 'components/marketing/testimonial/logos';
import Link from 'next/link';

export default function HeroCenterVariant () {
	return (
		<div className="py-10 md:py-20 bg-zinc-50 border-b border-zinc-200">
			<div className="container px-5 md:px-20 mx-auto flex flex-col gap-5 items-start md:items-center text-left md:text-center">
				<AnnouncementSmall href="/">
					Announcing our next round of funding. Read more →
				</AnnouncementSmall>

				<h1 className="text-4xl md:text-5xl font-medium">
					Modern, Secure, and Reliable <br className="hidden md:block"/>
					Operating System for your Business
				</h1>

				<p className="md:text-2xl mx-auto">
					Get your business up and running with Novel OS. A modern, secure,<br/>
					and reliable operating system for your small to medium enterprises.
				</p>

				<div>
					<Link href="/signup" className="button action wide">Get started</Link>
				</div>

				<div className="flex items-center gap-2">
					<span className="relative flex h-3 w-3">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
						<span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
					</span>
					Launching in December 2025
				</div>
				<div className="hidden md:block w-full bg-white border border-zinc-300 rounded-2xl mt-10" style={{ height: 520 }}></div>
				<div className="block md:hidden w-full bg-white border border-zinc-300 rounded-2xl mt-10" style={{ height: 320 }}></div>

				<TestimonialLogos/>
			</div>
		</div>
	);
}
