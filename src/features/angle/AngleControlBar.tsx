import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Button from "@mui/material/Button";
import { ControlBar } from "../../components/ControlBar";

import { useState, useEffect } from "react";
import useFirebase from "../../hooks/useFirebase";
import { useChangeAngle } from "../../store/FanState";
const MAX_ANGLE = 180;
const MIN_ANGLE = 0;
const STEP = 10;

export const AngleControlBar = () => {
  const { data } = useChangeAngle();
  const [angle, setAngle] = useState(data.current);
  const [speedTransition, setSpeedTransition] = useState<number>(1);
  const controlFirebase = useFirebase();
  useEffect(() => {
    setAngle(data.current);
  }, [data.current]);

  useEffect(() => {
    setSpeedTransition(data.speed);
  }, [data.speed]);

  return (
    <ControlBar
      auto={data.auto}
      setAutoFb={controlFirebase.handleChangeAngelAuto}
    >
      <ControlBar.Props>
        {({ auto }) => (
          <ControlBar.Header
            title={
              auto
                ? `Speed transition | ${speedTransition}`
                : `Angle adjustment | ${angle}°`
            }
          >
            <ControlBar.Switch />
          </ControlBar.Header>
        )}
      </ControlBar.Props>
      <ControlBar.ManualMode>
        <ControlBar.Body>
          <div className="flex justify-between w-full">
            <Button
              variant="outlined"
              disabled={angle <= MIN_ANGLE}
              startIcon={<ChevronLeftIcon />}
              onClick={() => {
                if (angle > MIN_ANGLE) {
                  controlFirebase.handleChangeAngel(angle - STEP);
                }
              }}
            >
              Left
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                controlFirebase.handleChangeAngel(90);
              }}
            >
              Center
            </Button>
            <Button
              disabled={angle >= MAX_ANGLE}
              variant="outlined"
              endIcon={<ChevronRightIcon />}
              onClick={() => {
                if (angle < MAX_ANGLE) {
                  controlFirebase.handleChangeAngel(angle + STEP);
                }
              }}
            >
              Right
            </Button>
          </div>
        </ControlBar.Body>
      </ControlBar.ManualMode>
      <ControlBar.AutoMode>
        <ControlBar.Body>
          {[1, 2, 3].map((item) => {
            return (
              <ControlBar.Item
                icon={item.toString()}
                key={item}
                onClick={() => {
                  controlFirebase.handleChangeAngelSpeed(item);
                }}
                mode={item === speedTransition ? "filled" : "outlined"}
              />
            );
          })}
        </ControlBar.Body>
      </ControlBar.AutoMode>
    </ControlBar>
  );
};
