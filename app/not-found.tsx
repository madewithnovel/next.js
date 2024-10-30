import Link from 'next/link';

export default function NotFoundPage () {
	return (
		<div className="h-screen w-full flex items-center justify-center">
			<div style={{ maxWidth: 600, minWidth: 480 }} className="flex flex-col gap-5 p-10">
				<h1 className="text-4xl font-medium">This page doesn't exist</h1>
				<p className="text-lg">You've stumbled upon a page that shouldn't be linked from anywhere. Please check the URL you have in your browser.</p>
				<div>
					<Link href="/">Home</Link>
				</div>
			</div>
		</div>
	);
}
