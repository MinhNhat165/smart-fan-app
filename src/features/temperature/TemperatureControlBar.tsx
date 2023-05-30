import { ControlBar } from '../../components/ControlBar';
import Slider from '../../components/Slider';
import { useEffect } from 'react';
import useFirebase from '../../hooks/useFirebase';
import { useTemp } from '../../store/FanState';

const MAX_TEMP = 50;

export const TemperatureControlBar = () => {
	const { data: temp, setThreshold } = useTemp();

	const controlFirebase = useFirebase();

	useEffect(() => {
		controlFirebase.handleGetDataOnOff();
	}, []);

	return (
		<ControlBar
			auto={temp.auto}
			setAutoFb={controlFirebase.handleEnableTempControl}
			className="flex flex-col"
		>
			<ControlBar.Header title="Temperature control">
				<ControlBar.Switch switchTitle="On" />
			</ControlBar.Header>
			<ControlBar.Body className="flex items-center flex-1">
				<div className="w-28 h-28 border-blue-950 -mt-2 border-2 rounded-full mx-auto">
					<div className="flex justify-center items-center h-full">
						<span className="text-4xl font-bold text-teal-700">
							{temp.current}
						</span>
					</div>
				</div>
			</ControlBar.Body>
			<div className="flex font-bold mt-10">
				<div className="w-1/5">State</div>
				<div className="flex-1 text-center flex justify-between pl-4">
					<span className="text-sky-600 text-sm">0°C</span>
					<span>Temperature</span>
					<span className="text-sky-600 text-sm">50°C</span>
				</div>
			</div>
			<AdjustItem title="OFF">
				<Slider
					max={MAX_TEMP}
					disabled={!temp.auto}
					valueLabelDisplay="auto"
					value={temp.threshold}
					onChange={(e, value) => {
						controlFirebase.handleSetTempThreshold(value as number);
						setThreshold(value as number);
					}}
				/>
			</AdjustItem>

			<AdjustItem title="ON">
				<Slider
					disabled={!temp.auto}
					max={MAX_TEMP}
					valueLabelDisplay="auto"
					value={temp.threshold + 1}
					onChange={(e, value) => {
						const newValue = (value as number) - 1;
						controlFirebase.handleSetTempThreshold(newValue);
						setThreshold(newValue);
					}}
					track="inverted"
				/>
			</AdjustItem>
		</ControlBar>
	);
};

function AdjustItem({
	children,
	title,
}: {
	children?: React.ReactNode;
	title?: string;
}) {
	return (
		<div className="flex items-center">
			<div className="w-1/5">
				<span>{title}</span>
			</div>
			<div className="flex-1 flex items-center gap-2 pl-6">
				{children}
			</div>
		</div>
	);
}
