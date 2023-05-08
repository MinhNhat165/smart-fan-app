export interface ControlBarHeaderProps {
	title?: string;
	children?: React.ReactNode;
}

const ControlBarHeader = ({ title, children }: ControlBarHeaderProps) => {
	return (
		<div className="flex items-center justify-between mb-4">
			{title && (
				<h2 className="text-slate-800 text-lg text-start">{title}</h2>
			)}
			{children}
		</div>
	);
};

export default ControlBarHeader;
