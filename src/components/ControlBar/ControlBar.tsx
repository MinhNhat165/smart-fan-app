import { ReactNode, createContext, useContext, useState } from 'react';

import ControlBarBody from './ControlBarBody';
import ControlBarHeader from './ControlBarHeader';
import { ControlBarItem } from './ControlBarItem';
import Switch from '../Switch';
import { useEffect } from 'react';

export interface ControlBarContext {
	title?: string;
	auto?: boolean;
	setAuto?: (auto: boolean) => void;
}

const ControlBarContext = createContext<ControlBarContext>({});

export function useControlBar() {
	return useContext(ControlBarContext);
}

export interface ControlBarProps {
	children?: ReactNode;
	auto?: boolean;
}
export function ControlBar({ children, auto: _auto = false }: ControlBarProps) {
	const [auto, setAuto] = useState<boolean>(_auto);
	useEffect(() => {
		setAuto(_auto);
	}, [_auto]);
	return (
		<ControlBarContext.Provider
			value={{
				title: 'Control Bar',
				auto,
				setAuto,
			}}
		>
			<div className="p-3 bg-white shadow rounded-lg mx-2 md:w-80 md:h-[400px]">
				{children}
			</div>
		</ControlBarContext.Provider>
	);
}

const ControlBarSwitch = () => {
	const { auto, setAuto } = useControlBar();
	return (
		<div className="flex items-center gap-2">
			<span className="text-slate-400">Auto</span>{' '}
			<Switch checked={auto} onChange={setAuto} />
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
