import cx from 'classnames';

export default function TestimonialLogos (props) {
	return (
		<>
			<div className="hidden md:block text-lg mt-10">Trusted by 1,000+ businesses and 1M+ clients</div>
			<div className="hidden md:block">
				<div {...props} className={cx('flex justify-center gap-5', props.className)}>
					<div className="bg-zinc-200 rounded-lg shrink-0 h-16 w-32"></div>
					<div className="bg-zinc-200 rounded-lg shrink-0 h-16 w-24"></div>
					<div className="bg-zinc-200 rounded-lg shrink-0 h-16 w-32"></div>
					<div className="bg-zinc-200 rounded-lg shrink-0 h-16 w-40"></div>
					<div className="bg-zinc-200 rounded-lg shrink-0 h-16 w-16"></div>
				</div>
			</div>
		</>
	);
}
