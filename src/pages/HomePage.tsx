import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { onValue, ref } from 'firebase/database';
import { useChangeAngle, useOnOfFan, useTemp } from '../store/FanState';
import { useEffect, useState } from 'react';

import { Angle } from '../types/angle';
import { AngleControlBar } from '../features/angle';
import { ArrowLeftOnRectangleIcon } from '../components/icons';
import { Fan } from '../types/fan';
import { Fan as FanUi } from '../components/Fan';
import { OnOfControlBar } from '../features/on-off';
import { Temp } from '../types/temp';
import { TemperatureControlBar } from '../features/temperature';

const HomePage = () => {
	const [authUser, setAuthUser] = useState<any>();

	useEffect(() => {
		const listen = onAuthStateChanged(auth, (user) => {
			if (user) {
				setAuthUser(user);
			} else {
				window.location.href = '/auth/login';
				setAuthUser(null);
			}
		});
		return () => {
			listen();
		};
	});
	useEffect(() => {
		if (authUser === null) {
			window.location.href = '/auth/login';
		}
	}, [authUser]);

	const { setAuto, setEnable } = useOnOfFan();

	const { setCurrentAngle, setAutoAngle, setSpeedAngle } = useChangeAngle();

	const { setCurrentTemp, setThreshold, setAutoTemp } = useTemp();
	useEffect(() => {
		const starCountRef = ref(db, '/temp');
		onValue(starCountRef, (snapshot) => {
			const data: Temp = snapshot.val();
			setCurrentTemp(data.current);
			setThreshold(data.threshold);
			setAutoTemp(data.auto);
		});
	}, []);

	useEffect(() => {
		const starCountRef = ref(db, '/fan');
		onValue(starCountRef, (snapshot) => {
			const data: Fan = snapshot.val();
			setEnable(data.enable);
			setAuto(data.auto);
		});
	}, []);

	useEffect(() => {
		const starCountRef = ref(db, '/angle');
		onValue(starCountRef, (snapshot) => {
			const data: Angle = snapshot.val();
			setCurrentAngle(data.current);
			setAutoAngle(data.auto);
			setSpeedAngle(data.speed);
		});
	}, []);
	const userSignOut = () => {
		signOut(auth)
			.then(() => {
				window.location.href = '/auth/login';
			})
			.catch((error) => console.log(error));
	};

	return (
		<div className="w-screen home h-screen bg-slate-50 flex flex-col gap-3 pb-4 text-slate-600">
			<div className="h-14 w-full  flex bg-white items-center shadow-md sticky top-0 p-2 z-10">
				<button
					className="w-10 h-10 justify-self-start flex items-center rounded-full justify-center"
					onClick={() => {
						userSignOut();
						// window.location.href = "/auth/login";
					}}
				>
					<ArrowLeftOnRectangleIcon className="w-6 h-6 text-slate-800" />
				</button>
				<span className="justify-self-center">Super smart fan</span>
			</div>
			<div className="flex flex-col gap-3 md:flex-row md:p-10  md:h-full md:mx-auto">
				<div className="flex md:w-80 md:h-[400px]">
					<div className="w-full flex justify-self-center justify-center items-center">
						<FanUi />
					</div>
				</div>
				<OnOfControlBar />
				<TemperatureControlBar />
				<AngleControlBar />
			</div>
		</div>
	);
};

export default HomePage;
