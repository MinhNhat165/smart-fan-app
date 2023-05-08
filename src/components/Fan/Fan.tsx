import clsx from 'clsx';
import { useOnOfFan } from '../../store/FanState';

export function Fan() {
	const on = useOnOfFan((state) => state.data.on);
	return (
		<div className="aspect-square w-56 h-56">
			<div
				className={clsx(
					'w-full h-full rounded-full p-6 relative  flex items-center justify-center',
					on ? 'animate-spin' : '',
				)}
			>
				<div
					className={clsx(
						'w-full h-full rounded-full transition-all duration-500 border-teal-500 border-2 p-0.5',
						on ? 'opacity-100' : 'opacity-0',
					)}
				>
					<div className="w-full h-full  rounded-full border-teal-500 border-2 p-0.5 ">
						<div className="w-full h-full rounded-full border-teal-500 border-2  p-0.5">
							<div className="w-full h-full  rounded-full border-teal-500 border-2 p-0.5"></div>
						</div>
					</div>
				</div>
				<div className="w-56 h-56 rounded-full border-sky-200 border-8 absolute left-[-2px] top-[-2px]"></div>
				<div className="w-56 h-56 rounded-full border-sky-200 border-8 absolute left-[-2px] top-0"></div>
				<div className="w-56 h-56 rounded-full border-sky-200 border-8 absolute left-[1px] top-[3px]"></div>
				<div className="w-56 h-56 rounded-full border-sky-200 border-8 absolute left-[2px] top-0"></div>
				<div className="w-56 h-56 rounded-full border-sky-200 border-8 absolute left-[1px] top-[-1px]"></div>
				<div className="w-56 h-56 rounded-full border-sky-300 border-8 absolute left-0 top-[2px]"></div>
				<div className="w-56 h-56 rounded-full border-sky-600 border-8 absolute left-[2px] top-[2px]"></div>
				<div className="w-56 h-56 rounded-full border-sky-400 border-8 absolute left-[1px] top-[2px]"></div>
				<div className="w-56 h-56 rounded-full border-sky-200 border-8 absolute left-[-2px] bottom-[-2px]"></div>
				<div className="w-56 h-56 rounded-full border-sky-200 border-8 absolute left-[-2px] bottom-0"></div>
				<div className="w-56 h-56 rounded-full border-sky-200 border-8 absolute left-[1px] bottom-[3px]"></div>
				<div className="w-56 h-56 rounded-full border-sky-200 border-8 absolute left-[2px] bottom-0"></div>
				<div className="w-56 h-56 rounded-full border-sky-200 border-8 absolute left-[1px] bottom-[-1px]"></div>
				<div className="w-56 h-56 rounded-full border-sky-300 border-8 absolute left-0 bottom-[2px]"></div>
				<div className="w-56 h-56 rounded-full border-sky-600 border-8 absolute left-[2px] bottom-[2px]"></div>
				<div className="w-56 h-56 rounded-full border-sky-400 border-8 absolute left-[1px] bottom-[2px]"></div>

				<div className="w-56 h-56 rounded-full border-sky-200 border-8 absolute right-[-2px] top-[-2px]"></div>
				<div className="w-56 h-56 rounded-full border-sky-200 border-8 absolute right-[-2px] top-0"></div>
				<div className="w-56 h-56 rounded-full border-sky-200 border-8 absolute right-[1px] top-[3px]"></div>
				<div className="w-56 h-56 rounded-full border-sky-200 border-8 absolute right-[2px] top-0"></div>
				<div className="w-56 h-56 rounded-full border-sky-200 border-8 absolute right-[1px] top-[-1px]"></div>
				<div className="w-56 h-56 rounded-full border-sky-300 border-8 absolute right-0 top-[2px]"></div>
				<div className="w-56 h-56 rounded-full border-sky-600 border-8 absolute right-[2px] top-[2px]"></div>
				<div className="w-56 h-56 rounded-full border-sky-400 border-8 absolute right-[1px] top-[2px]"></div>
				<div className="w-56 h-56 rounded-full border-sky-200 border-8 absolute right-[-2px] bottom-[-2px]"></div>
				<div className="w-56 h-56 rounded-full border-sky-200 border-8 absolute right-[-2px] bottom-0"></div>
				<div className="w-56 h-56 rounded-full border-sky-200 border-8 absolute right-[1px] bottom-[3px]"></div>
				<div className="w-56 h-56 rounded-full border-sky-200 border-8 absolute right-[2px] bottom-0"></div>
				<div className="w-56 h-56 rounded-full border-sky-200 border-8 absolute right-[1px] bottom-[-1px]"></div>
				<div className="w-56 h-56 rounded-full border-sky-300 border-8 absolute right-0 bottom-[2px]"></div>
				<div className="w-56 h-56 rounded-full border-sky-600 border-8 absolute right-[2px] bottom-[2px]"></div>
				<div className="w-56 h-56 rounded-full border-sky-400 border-8 absolute right-[1px] bottom-[2px]"></div>
			</div>
		</div>
	);
}
