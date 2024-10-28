export default function FeaturesMetrics () {
	return (

		<div className="border-b border-stone-200">
			<div className="container flex flex-col gap-10 mx-auto p-10">
				<div className="text-6xl font-medium tracking-tight text-center">
					Simple, powerful, and reliable
				</div>
				<div className="grid grid-cols-3 gap-10">
					<div className="flex flex-col items-center justify-center py-20">
						<div className="relative">
							<div className="absolute text-sm top-0 -mt-5 font-medium text-stone-500">Up to</div>
							<div className="text-6xl font-medium">500gb</div>
						</div>
						<div className="text-xl">files processed per minute</div>
					</div>
					<div className="flex flex-col items-center justify-center py-20">
						<div className="text-6xl font-medium">2.5m</div>
						<div className="text-xl">chats per minute</div>
					</div>
					<div className="flex flex-col items-center justify-center py-20">
						<div className="text-6xl font-medium">100+</div>
						<div className="text-xl">organizations in Novel</div>
					</div>
				</div>
			</div>
		</div>
	);
}
