import { CalendarDaysIcon, ClockIcon, PowerIcon } from "../../components/icons";

import { Button } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { ControlBar } from "../../components/ControlBar";
import DurationSelector from "../../components/DurationPicker";
import useFirebase from "../../hooks/useFirebase";
import { useOnOfFan } from "../../store/FanState";
import { db } from "../../lib/firebase";
import { onValue, ref } from "firebase/database";
import { format, isEqual, isSameMinute, parse, startOfDay } from "date-fns";

enum TimeMode {
  TIMER = "TIMER",
  SCHEDULE = "SCHEDULE",
}

export const OnOfControlBar = () => {
  const { data } = useOnOfFan();
  const enable = data.enable;
  const auto = data.auto;
  const [timeMode, setTimeMode] = useState<TimeMode>(TimeMode.TIMER);
  const [timeEnd, setTimeEnd] = useState<string>("");
  const [timeStart, setTimeStart] = useState<string>("");
  const controlFirebase = useFirebase();

  const handleOnOff = () => {
    controlFirebase.handleOnOffFan(!enable);
  };
  useEffect(() => {
    const starCountRef = ref(db, "/timer/end");
    onValue(starCountRef, (snapshot) => {
      const data: string = snapshot.val();
      setTimeEnd(data);
    });
  }, []);
  useEffect(() => {
    const starCountRef = ref(db, "/timer/start");
    onValue(starCountRef, (snapshot) => {
      const data: string = snapshot.val();
      setTimeStart(data);
    });
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (auto) {
      interval = setInterval(() => {
        const currentTime = format(new Date(), "HH:mm");
        const time = enable ? timeStart : timeEnd;
        const parsedTime = parse(time, "HH:mm", new Date());
        const parsedCurrentTime = parse(currentTime, "HH:mm", new Date());

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
  }, [auto, timeEnd]);

  // useEffect(() => {
  //   if(auto){
  //     const currentDateTime = new Date();
  //     const formattedTime = format(currentDateTime, "H:mm");

  //     const currentTime = parse(
  //       formattedTime,
  //       "H:mm",
  //       startOfDay(currentDateTime)
  //     );
  //     const timeE = parse(timeEnd, "H:mm", startOfDay(currentDateTime));

  //     if()
  //     if (auto && isSameMinute(currentTime, timeE)) {
  //       controlFirebase.handleOnOffFan(false);
  //     }
  //   }

  // }, [auto]);
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
