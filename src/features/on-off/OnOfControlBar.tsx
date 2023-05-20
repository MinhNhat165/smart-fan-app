import { CalendarDaysIcon, ClockIcon, PowerIcon } from "../../components/icons";

import { Button } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { ControlBar } from "../../components/ControlBar";
import DurationSelector from "../../components/DurationPicker";
import useFirebase from "../../hooks/useFirebase";
import { useOnOfFan } from "../../store/FanState";

enum TimeMode {
  TIMER = "TIMER",
  SCHEDULE = "SCHEDULE",
}

export const OnOfControlBar = () => {
  const { data } = useOnOfFan();
  const enable = data.enable;
  const auto = data.auto;
  const [timeMode, setTimeMode] = useState<TimeMode>(TimeMode.TIMER);
  const controlFirebase = useFirebase();

  const handleOnOff = () => {
    controlFirebase.handleOnOffFan(!enable);
  };
  return (
    <ControlBar auto={auto} setAutoFb={controlFirebase.handleChangeAutoOnOff}>
      <div className="flex justify-between">
        <ControlBar.AutoMode>
          <ControlBar.Item
            title={timeMode === TimeMode.TIMER ? "Timer" : "Schedule"}
            color={enable ? "danger" : "primary"}
            icon={
              timeMode === TimeMode.TIMER ? <ClockIcon /> : <CalendarDaysIcon />
            }
          />
        </ControlBar.AutoMode>
        <ControlBar.ManualMode>
          <ControlBar.Item
            title={enable ? "Turn off" : "Turn on"}
            color={enable ? "danger" : "primary"}
            onClick={handleOnOff}
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
                {enable ? "Turn off" : "Turn on"} after
              </span>
              <DurationSelector
                onChange={(value) => {
                  enable
                    ? controlFirebase.handleSetEndTimer(value)
                    : controlFirebase.handleSetStartTimer(value);
                }}
              />
            </>
          ) : (
            <div className="w-full flex flex-col gap-4 my-2">
              <TimePicker label="Turn on at" defaultValue={new Date()} />
              <TimePicker label="Turn off at" defaultValue={new Date()} />
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
              timeMode === TimeMode.TIMER ? TimeMode.SCHEDULE : TimeMode.TIMER
            );
          }}
        >
          Switch to
          {timeMode === TimeMode.TIMER ? " schedule " : " timer "}
          mode
        </div>
      </ControlBar.AutoMode>
    </ControlBar>
  );
};
