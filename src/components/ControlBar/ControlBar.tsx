import { ReactNode, createContext, useContext, useState } from 'react';

import ControlBarBody from './ControlBarBody';
import ControlBarHeader from './ControlBarHeader';
import { ControlBarItem } from './ControlBarItem';
import Switch from '../Switch';
import { useEffect } from 'react';

export interface ControlBarContext {
	title?: string;
	auto?: boolean;
	setAutoFb?: (auto: boolean) => void;
}

const ControlBarContext = createContext<ControlBarContext>({});

export function useControlBar() {
	return useContext(ControlBarContext);
}

export interface ControlBarProps {
	children?: ReactNode;
	className?: string;
	auto?: boolean;
	setAutoFb?: (auto: boolean) => void;
}
export function ControlBar({
	children,
	className,
	auto: _auto = false,
	setAutoFb,
}: ControlBarProps) {
	const [auto, setAuto] = useState<boolean>(_auto);
	useEffect(() => {
		setAuto(_auto);
	}, [_auto]);
	return (
		<ControlBarContext.Provider
			value={{
				title: 'Control Bar',
				auto,
				setAutoFb,
			}}
		>
			<div
				className={`p-3 bg-white shadow rounded-lg mx-2 md:w-80 md:h-[400px] ${className}`}
			>
				{children}
			</div>
		</ControlBarContext.Provider>
	);
}

const ControlBarSwitch = ({
	switchTitle = 'Auto',
}: {
	switchTitle?: string;
}) => {
	const { auto, setAutoFb } = useControlBar();

	return (
		<div className="flex items-center gap-2">
			<span className="text-slate-400">{switchTitle}</span>{' '}
			<Switch checked={auto} onChange={setAutoFb} />
		</div>
	);
};

const AutoMode = ({ children }: { children: ReactNode }) => {
	const { auto } = useControlBar();
	return <>{auto ? children : null}</>;
};

const ManualMode = ({ children }: { children: ReactNode }) => {
	const { auto } = useControlBar();
	return <>{auto ? null : children}</>;
};

ControlBar.Switch = ControlBarSwitch;
ControlBar.Item = ControlBarItem;
ControlBar.Header = ControlBarHeader;
ControlBar.Body = ControlBarBody;
ControlBar.AutoMode = AutoMode;
ControlBar.ManualMode = ManualMode;

const Props = ({
	children,
}: {
	children: (props: ControlBarContext) => ReactNode;
}) => {
	return <>{children(useControlBar())}</>;
};

ControlBar.Props = Props;
