import { Angle } from '../types/angle';
import { Fan } from '../types/fan';
import { Speed } from '../types/speed';
import { Temp } from '../types/temp';
import { create } from 'zustand';

enum Mode {
	Auto = 'auto',
	Manual = 'manual',
}

interface FanState {
	data: Fan;
	setEnable: (on: boolean) => void;
	setAuto: (mode: boolean) => void;
}

interface SpeedState {
	data: Speed;
	setCurrentSpeed: (speed: number) => void;
	setAutoSpeed: (mode: boolean) => void;
	setMaxOne: (max: number) => void;
	setMaxTwo: (max: number) => void;
}

interface AngleState {
	data: Angle;
	setCurrentAngle: (angle: number) => void;
	setAutoAngle: (mode: boolean) => void;
	setSpeedAngle: (speed: number) => void;
}

// interface TempState {
//   data: Temp;
//   setCurrentTemp: (angle: number) => void;
// }

const useOnOfFan = create<FanState>((set) => ({
	data: {
		enable: false,
		auto: false,
	},
	setEnable: (enable: boolean) =>
		set((state: FanState) => ({ data: { ...state.data, enable } })),
	setAuto: (auto: boolean) =>
		set((state: FanState) => ({ data: { ...state.data, auto } })),
}));

const useChangeSpeed = create<SpeedState>((set) => ({
	data: {
		auto: false,
		current: 1,
		one: { max: 20, min: 0 },
		two: { max: 40, min: 21 },
		three: { max: 50, min: 41 },
	},
	setCurrentSpeed: (current: number) =>
		set((state: SpeedState) => ({ data: { ...state.data, current } })),
	setAutoSpeed: (auto: boolean) =>
		set((state: SpeedState) => ({ data: { ...state.data, auto } })),
	setMaxOne: (max: number) =>
		set((state: SpeedState) => ({
			data: { ...state.data, one: { ...state.data.one, max } },
		})),
	setMaxTwo: (max: number) =>
		set((state: SpeedState) => ({
			data: { ...state.data, two: { ...state.data.two, max } },
		})),
}));

interface TempState {
	data: Temp;
	setCurrentTemp: (temp: number) => void;
	setThreshold: (threshold: number) => void;
	setAutoTemp: (auto: boolean) => void;
}

const useTemp = create<TempState>((set) => ({
	data: {
		current: 29,
		auto: false,
		threshold: 30,
	},
	setCurrentTemp: (current: number) =>
		set((state: TempState) => ({ data: { ...state.data, current } })),
	setThreshold: (threshold: number) =>
		set((state: TempState) => ({ data: { ...state.data, threshold } })),
	setAutoTemp: (auto: boolean) => {
		set((state: TempState) => ({ data: { ...state.data, auto } }));
	},
}));

const useChangeAngle = create<AngleState>((set) => ({
	data: {
		auto: false,
		current: 90,
		speed: 1,
	},
	setAutoAngle: (auto: boolean) =>
		set((state: AngleState) => ({ data: { ...state.data, auto } })),
	setCurrentAngle: (current: number) =>
		set((state: AngleState) => ({ data: { ...state.data, current } })),
	setSpeedAngle: (speed: number) =>
		set((state: AngleState) => ({ data: { ...state.data, speed } })),
}));

export { useOnOfFan, useChangeSpeed, useChangeAngle, useTemp, Mode };
