import { create } from 'zustand';
enum Mode {
	Auto = 'auto',
	Manual = 'manual',
}

interface FanState {
	data: {
		on: boolean;
		mode: Mode;
	};
	setOn: (on: boolean) => void;
	setMode: (mode: Mode) => void;
}

const useOnOfFan = create<FanState>((set) => ({
	data: {
		on: false,
		mode: Mode.Manual,
	},
	setOn: (on: boolean) =>
		set((state: FanState) => ({ data: { ...state.data, on } })),
	setMode: (mode: Mode) =>
		set((state: FanState) => ({ data: { ...state.data, mode } })),
}));

export { useOnOfFan, Mode };
