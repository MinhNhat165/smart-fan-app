import { child, get, getDatabase, ref, set } from 'firebase/database';

const useFirebase = () => {
	const handleGetDataOnOff = () => {
		const dbRef = ref(getDatabase());
		get(child(dbRef, `temp/current`))
			.then((snapshot) => {
				if (snapshot.exists()) {
					return snapshot.val();
				} else {
					console.log('No data available');
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const handleOnOffFan = (fanEnable: boolean) => {
		const db = getDatabase();
		set(ref(db, 'fan/enable'), fanEnable);
		set(ref(db, 'temp/auto'), false);
	};

	const handleChangeAutoOnOff = (auto: boolean) => {
		const db = getDatabase();
		set(ref(db, 'fan/auto'), auto);
		if (auto) {
			set(ref(db, 'temp/auto'), false);
		}
	};

	const handleChangeSpeed = (speed: number) => {
		const db = getDatabase();
		set(ref(db, 'speed/current'), speed);
	};

	const handleChangeSpeedAuto = (auto: boolean) => {
		const db = getDatabase();
		set(ref(db, 'speed/auto'), auto);
	};

	const handleChangeLevelOne = (max: number) => {
		const db = getDatabase();
		set(ref(db, 'speed/one/max'), max);
	};

	const handleChangeLevelTwo = (max: number) => {
		const db = getDatabase();
		set(ref(db, 'speed/two/max'), max);
	};
	const handleChangeAngel = (angle: number) => {
		const db = getDatabase();
		set(ref(db, 'angle/current'), angle);
	};

	const handleChangeAngelSpeed = (speed: number) => {
		const db = getDatabase();
		set(ref(db, 'angle/speed'), speed);
	};
	const handleChangeAngelAuto = (auto: boolean) => {
		const db = getDatabase();
		set(ref(db, 'angle/auto'), auto);
	};

	const handleEnableTimer = (timerEnable: boolean) => {
		const db = getDatabase();
		set(ref(db, 'timer/enable'), timerEnable);
	};

	const handleSetStartTimer = (time: string, isDuration: boolean) => {
		const db = getDatabase();
		set(ref(db, 'timer/start'), time);
		set(ref(db, 'timer/isDuration'), isDuration);
	};

	const handleSetEndTimer = (time: string, isDuration: boolean) => {
		const db = getDatabase();
		set(ref(db, 'timer/end'), time);
		set(ref(db, 'timer/isDuration'), isDuration);
	};

	const handleEnableTempControl = (tempEnable: boolean) => {
		const db = getDatabase();
		set(ref(db, 'temp/auto'), tempEnable);
		if (tempEnable) {
			set(ref(db, 'fan/auto'), false);
		}
	};

	const handleSetTempThreshold = (threshold: number) => {
		const db = getDatabase();
		set(ref(db, 'temp/threshold'), threshold);
	};

	return {
		handleGetDataOnOff,
		handleChangeAutoOnOff,
		handleOnOffFan,
		handleEnableTimer,
		handleSetStartTimer,
		handleSetEndTimer,
		handleEnableTempControl,
		handleSetTempThreshold,
		handleChangeSpeed,
		handleChangeSpeedAuto,
		handleChangeAngel,
		handleChangeAngelAuto,
		handleChangeAngelSpeed,
		handleChangeLevelOne,
		handleChangeLevelTwo,
	};
};

export default useFirebase;
