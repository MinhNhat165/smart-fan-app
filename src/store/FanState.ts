import { Fan } from "../types/fan";
import { create } from "zustand";
import { Speed } from "../types/speed";
import { Angle } from "../types/angle";

enum Mode {
  Auto = "auto",
  Manual = "manual",
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
}

interface AngleState {
  data: Angle;
  setCurrentAngle: (angle: number) => void;
  setAutoAngle: (mode: boolean) => void;
  setSpeedAngle: (speed: number) => void;
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

export { useOnOfFan, useChangeSpeed, useChangeAngle, Mode };
