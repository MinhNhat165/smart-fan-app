import clsx from 'clsx';

export interface ControlBarBodyProps {
	children?: React.ReactNode;
	className?: string;
}

const ControlBarBody = ({ children, className }: ControlBarBodyProps) => {
	return (
		<div className={clsx('flex justify-between', className)}>
			{children}
		</div>
	);
};

export default ControlBarBody;
