'use client';

import { useState } from 'react';

const tabs = ['Messaging', 'Files', 'Workspaces'];

export default function FeaturesTabbed () {
	const [active, setActive] = useState(0);

	return (<div className="container flex flex-col gap-10 mx-auto p-10">
		<div className="w-3/4 flex flex-col gap-5">
			<div className="text-6xl font-medium tracking-tight">
				Everything you need to run a modern service
				business.
			</div>
			<div className="text-xl text-stone-700">
				Consolidate your technology stack. Novel comes with messaging,
				billing, file-sharing, eSignatures, intake forms, and help desks out of the box. And with
				modularity built in, start with just one App and seamlessly enable more over time.
			</div>
		</div>
		<div className="border-b border-stone-200 font-medium flex items-center w-full py-2 gap-2">
			{tabs.map((tab, i) => (
				<div key={`tab${i}`}
					className={`px-8 py-2.5 rounded-xl cursor-pointer ${active === i ? 'bg-stone-200' : 'bg-stone-50'}`}
					onClick={() => setActive(i)}>
					{tab}
				</div>
			))}
		</div>
		<div className="flex gap-10">
			{active === 0 && (
				<>
					<div className="w-1/3 flex flex-col gap-5">
						<div className="text-4xl font-medium">Messaging</div>
						<div className="text-lg">Let clients securely and seamlessly message you from your portal,
							and give your team the ability to centralize client communication and stay organized.
						</div>
						<div>
							<button className="button action wide">Learn more</button>
						</div>
					</div>
					<div className="flex-1 rounded-3xl bg-stone-900 h-96"></div>
				</>
			)}
			{active === 1 && (
				<>
					<div className="w-1/3 flex flex-col gap-5">
						<div className="text-4xl font-medium">Files</div>
						<div className="text-lg">Let clients securely and seamlessly message you from your portal,
							and give your team the ability to centralize client communication and stay organized.
						</div>
						<div>
							<button className="button action wide">Learn more</button>
						</div>
					</div>
					<div className="flex-1 rounded-3xl bg-stone-900 h-96"></div>
				</>
			)}
			{active === 2 && (
				<>

					<div className="flex-1 rounded-3xl bg-stone-900 h-96"></div>
					<div className="w-1/3 flex flex-col gap-5">
						<div className="text-4xl font-medium">Workspace</div>
						<div className="text-lg">Let clients securely and seamlessly message you from your portal,
							and give your team the ability to centralize client communication and stay organized.
						</div>
						<div>
							<button className="button action wide">Learn more</button>
						</div>
					</div>
				</>
			)}
		</div>
	</div>
	);
}
