import { Fan } from '../types/fan';
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

export { useOnOfFan, Mode };
