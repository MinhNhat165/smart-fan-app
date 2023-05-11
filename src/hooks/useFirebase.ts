import { getDatabase, onValue, ref, set } from 'firebase/database';

import { db } from '../lib/firebase';
import { useEffect } from 'react';

const useFirebase = () => {
	// const [curTemperature, setCurTemperature] = useState(32);

	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		handleUpdateTemperature();
	// 	}, UPDATE_TEMPERATURE_TIMESTAMP);
	// 	return () => clearInterval(interval);
	// }, []);

	// useEffect(() => {
	// 	const starCountRef = ref(db, '/fan');
	// 	onValue(starCountRef, (snapshot) => {
	// 		const data = snapshot.val();
	// 		console.log('data', data);
	// 	});
	// }, []);

	const handleUpdateTemperature = () => {
		const starCountRef = ref(db, '/');
		onValue(starCountRef, (snapshot) => {
			const data = snapshot.val();
			// setCurTemperature(data.temp.measure);
		});
	};

	const handleGetDataOnOff = () => {
		const db = getDatabase();
		// return db.fan.enable;
		console.log('db', db);
	};

	const handleOnOffFan = (fanEnable: boolean) => {
		console.log('first');
		const db = getDatabase();
		set(ref(db, 'fan/enable'), fanEnable);
	};

	const handleEnableTimer = (timerEnable: boolean) => {
		const db = getDatabase();
		set(ref(db, 'timer/enable'), timerEnable);
	};

	const handleSetStartTimer = (time: string) => {
		const db = getDatabase();
		set(ref(db, 'timer/start'), time);
	};

	const handleSetEndTimer = (time: string) => {
		const db = getDatabase();
		set(ref(db, 'timer/end'), time);
	};

	const handleEnableTempControl = (tempEnable: boolean) => {
		const db = getDatabase();
		set(ref(db, 'temp/enable'), tempEnable);
	};

	const handleSetTempThreshold = (threshold: number) => {
		const db = getDatabase();
		set(ref(db, 'temp/threshold'), threshold);
	};

	return {
		// curTemperature,
		handleGetDataOnOff,
		handleOnOffFan,
		handleEnableTimer,
		handleSetStartTimer,
		handleSetEndTimer,
		handleEnableTempControl,
		handleSetTempThreshold,
	};
};

export default useFirebase;
