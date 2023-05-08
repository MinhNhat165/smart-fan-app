import { AngleControlBar } from '../features/angle';
import { ArrowLeftOnRectangleIcon } from '../components/icons';
import { Fan } from '../components/Fan';
import { OnOfControlBar } from '../features/on-off';
import { SpeedControlBar } from '../features/speed';

const HomePage = () => {
	return (
		<div className="w-screen home h-screen bg-slate-50 flex flex-col gap-3 pb-4 text-slate-600">
			<div className="h-14 w-full  flex bg-white items-center shadow-md sticky top-0 p-2 z-10">
				<button
					className="w-10 h-10 justify-self-start flex items-center rounded-full justify-center"
					onClick={() => {
						window.location.href = '/auth/login';
					}}
				>
					<ArrowLeftOnRectangleIcon className="w-6 h-6 text-slate-800" />
				</button>
				<span className="justify-self-center">Super smart fan</span>
			</div>
			<div className="flex flex-col gap-3 md:flex-row md:p-10  md:h-full md:mx-auto">
				<div>
					<div className="w-full flex justify-self-center justify-center mb-4">
						<Fan />
					</div>
					<div className="flex justify-center px-10 pb-2 gap-2">
						<div className="text-slate-600 w-32 text-center">
							<div className="text-3xl">25</div>
							<div>Temperature (°C)</div>
						</div>
						<div className="w-0.5 h-full bg-slate-200 rounded-lg"></div>
						<div className="text-slate-600 w-32 text-center">
							<div className="text-3xl">1</div>
							<div>Speed level</div>
						</div>
					</div>
				</div>
				<OnOfControlBar />
				<SpeedControlBar />
				<AngleControlBar />
			</div>
		</div>
	);
};

export default HomePage;
