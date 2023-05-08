import { TimePicker } from '@mui/x-date-pickers';
import { ControlBar } from '../../components/ControlBar';
import DurationSelector from '../../components/DurationPicker';
import { CalendarDaysIcon, ClockIcon, PowerIcon } from '../../components/icons';
import { useOnOfFan } from '../../store/FanState';
import { useState } from 'react';
import { Button } from '@mui/material';
enum TimeMode {
	TIMER = 'TIMER',
	SCHEDULE = 'SCHEDULE',
}

export const OnOfControlBar = () => {
	const { data, setOn } = useOnOfFan();
	const [timeMode, setTimeMode] = useState<TimeMode>(TimeMode.TIMER);
	return (
		<ControlBar>
			<div className="flex justify-between">
				<ControlBar.AutoMode>
					<ControlBar.Item
						title={
							timeMode === TimeMode.TIMER ? 'Timer' : 'Schedule'
						}
						color={data.on ? 'danger' : 'primary'}
						icon={
							timeMode === TimeMode.TIMER ? (
								<ClockIcon />
							) : (
								<CalendarDaysIcon />
							)
						}
					/>
				</ControlBar.AutoMode>
				<ControlBar.ManualMode>
					<ControlBar.Item
						title={data.on ? 'Turn off' : 'Turn on'}
						color={data.on ? 'danger' : 'primary'}
						onClick={() => {
							setOn(!data.on);
						}}
						icon={<PowerIcon />}
					/>
				</ControlBar.ManualMode>
				<ControlBar.Switch />
			</div>
			<ControlBar.AutoMode>
				<ControlBar.Body className="my-4 flex flex-col">
					{timeMode === TimeMode.TIMER ? (
						<>
							<span className="font-bold">
								{data.on ? 'Turn off' : 'Turn on'} after
							</span>
							<DurationSelector
								onChange={(value) => {
									console.log(value);
								}}
							/>
						</>
					) : (
						<div className="w-full flex flex-col gap-4 my-2">
							<TimePicker
								label="Turn on at"
								defaultValue={new Date()}
							/>
							<TimePicker
								label="Turn off at"
								defaultValue={new Date()}
							/>
							<Button variant="contained" size="large">
								Save
							</Button>
						</div>
					)}
				</ControlBar.Body>
				<div
					className="text-sky-500 underline"
					onClick={() => {
						setTimeMode(
							timeMode === TimeMode.TIMER
								? TimeMode.SCHEDULE
								: TimeMode.TIMER,
						);
					}}
				>
					Switch to
					{timeMode === TimeMode.TIMER ? ' schedule ' : ' timer '}
					mode
				</div>
			</ControlBar.AutoMode>
		</ControlBar>
	);
};
