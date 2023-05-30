import { CalendarDaysIcon, ClockIcon, PowerIcon } from '../../components/icons';
import { format, isEqual, parse, set } from 'date-fns';
import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';

import { Button } from '@mui/material';
import { ControlBar } from '../../components/ControlBar';
import DurationSelector from '../../components/DurationPicker';
import { TimePicker } from '@mui/x-date-pickers';
import { db } from '../../lib/firebase';
import useFirebase from '../../hooks/useFirebase';
import { useOnOfFan } from '../../store/FanState';

enum TimeMode {
	TIMER = 'TIMER',
	SCHEDULE = 'SCHEDULE',
}

export const OnOfControlBar = () => {
	const { data } = useOnOfFan();
	const enable = data.enable;
	const auto = data.auto;
	const [timeMode, setTimeMode] = useState<TimeMode>(TimeMode.TIMER);
	const [timeEnd, setTimeEnd] = useState<string>('');
	const [timeStart, setTimeStart] = useState<string>('');
	const [isSetTime, setIsSetTime] = useState<boolean>(false);
	const [time, setTime] = useState<string | null>(null);
	const controlFirebase = useFirebase();

	const [start, setStart] = useState<string | null>(
		format(new Date(), 'HH:mm'),
	);
	const [end, setEnd] = useState<string | null>(format(new Date(), 'HH:mm'));

	const handleOnOff = () => {
		controlFirebase.handleOnOffFan(!enable);
	};
	useEffect(() => {
		const starCountRef = ref(db, '/timer/end');
		onValue(starCountRef, (snapshot) => {
			const data: string = snapshot.val();
			setTimeEnd(data);
		});
	}, []);
	useEffect(() => {
		const starCountRef = ref(db, '/timer/start');
		onValue(starCountRef, (snapshot) => {
			const data: string = snapshot.val();
			setTimeStart(data);
		});
	}, []);

	useEffect(() => {
		let interval: NodeJS.Timeout | null = null;

		if (auto) {
			interval = setInterval(() => {
				const currentTime = format(new Date(), 'HH:m');
				const time = enable ? timeEnd : timeStart;
				const parsedTime = parse(time, 'HH:mm', new Date());
				const parsedCurrentTime = parse(
					currentTime,
					'HH:mm',
					new Date(),
				);

				if (isEqual(parsedTime, parsedCurrentTime)) {
					handleOnOff();
				}
			}, 1000);
		}

		return () => {
			if (interval) {
				clearInterval(interval);
			}
		};
	}, [auto, timeEnd, timeStart]);

	return (
		<ControlBar
			auto={auto}
			setAutoFb={controlFirebase.handleChangeAutoOnOff}
			className="flex flex-col"
		>
			<div className="flex justify-between">
				<ControlBar.AutoMode>
					<ControlBar.Item
						title={
							timeMode === TimeMode.TIMER ? 'Timer' : 'Schedule'
						}
						color={enable ? 'danger' : 'primary'}
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
						title={enable ? 'Turn off' : 'Turn on'}
						color={enable ? 'danger' : 'primary'}
						onClick={handleOnOff}
						icon={<PowerIcon />}
					/>
				</ControlBar.ManualMode>
				<ControlBar.Switch />
			</div>
			<ControlBar.AutoMode>
				<ControlBar.Body className="my-4 flex flex-col flex-1">
					{timeMode === TimeMode.TIMER ? (
						<>
							<span className="font-bold">
								{enable ? 'Turn off' : 'Turn on'} at {time}
							</span>
							{!isSetTime ? (
								<DurationSelector
									onChange={(value) => {
										setTime(value);
										enable
											? controlFirebase.handleSetEndTimer(
													value,
													true,
													// eslint-disable-next-line no-mixed-spaces-and-tabs
											  )
											: controlFirebase.handleSetStartTimer(
													value,
													true,
													// eslint-disable-next-line no-mixed-spaces-and-tabs
											  );
										setIsSetTime(true);
									}}
								/>
							) : (
								<div className="flex justify-between">
									<Button
										variant="contained"
										fullWidth
										onClick={() => setIsSetTime(false)}
									>
										Change
									</Button>
								</div>
							)}
						</>
					) : (
						<div className="w-full flex flex-col gap-4 my-2">
							<TimePicker
								disabled={isSetTime}
								label="Turn on at"
								defaultValue={new Date()}
								onChange={(value) => {
									setStart(format(value as Date, 'H:m'));
								}}
							/>
							<TimePicker
								disabled={isSetTime}
								label="Turn off at"
								defaultValue={new Date()}
								onChange={(value) => {
									setEnd(format(value as Date, 'H:m'));
								}}
							/>
							<Button
								onClick={() => {
									if (isSetTime) {
										setIsSetTime(false);
										return;
									}

									setIsSetTime(true);
									controlFirebase.handleSetStartTimer(
										start as string,
										false,
									);
									controlFirebase.handleSetEndTimer(
										end as string,
										false,
									);
								}}
								variant="contained"
								size="large"
							>
								{isSetTime ? 'Change' : 'Set'}
							</Button>
						</div>
					)}
					<div
						className="text-sky-500 underline mb-0 cursor-pointer"
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
				</ControlBar.Body>
			</ControlBar.AutoMode>
		</ControlBar>
	);
};
