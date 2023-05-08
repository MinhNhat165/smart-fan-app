import clsx from 'clsx';

const modes = {
	outlined: 'border border-slate-400 bg-transparent text-slate-400',
	filled: 'text-white',
	text: 'text-sky-500',
};
const colors = {
	danger: 'bg-red-500',
	primary: 'bg-sky-500',
};
const textColors = {
	danger: 'text-red-500',
	primary: 'text-sky-500',
};
interface ControlBarItemProps {
	children?: React.ReactNode;
	icon?: React.ReactNode | string;
	color?: keyof typeof colors;
	mode?: keyof typeof modes;
	title?: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}
export function ControlBarItem({
	color = 'primary',
	mode = 'filled',
	title,
	icon,
	onClick,
}: ControlBarItemProps) {
	return (
		<div className="flex items-center gap-2">
			<button
				onClick={onClick}
				className={clsx(
					'w-12 h-12 rounded-full flex items-center justify-center shadow',
					modes[mode],
					colors[color],
				)}
			>
				<div className="w-6 h-6">{icon}</div>
			</button>
			{title && <h3 className={clsx(textColors[color])}>{title}</h3>}
		</div>
	);
}
