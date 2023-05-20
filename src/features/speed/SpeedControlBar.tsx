import { useEffect, useState } from "react";
import { ControlBar } from "../../components/ControlBar";
import Slider from "../../components/Slider";
import useFirebase from "../../hooks/useFirebase";
import { useChangeSpeed } from "../../store/FanState";

const MAX_TEMP = 50;

export const SpeedControlBar = () => {
  const { data } = useChangeSpeed();
  const [speed, setSpeed] = useState<number>(data.current);
  const [tempLevelOne, setTempLevelOne] = useState<number>(data.one.max);
  const [tempLevelTwo, setTempLevelTwo] = useState<number>(data.two.max);
  const [tempLevelThree, setTempLevelThree] = useState<number>(
    tempLevelTwo + 1
  );
  console.log("2 ", tempLevelTwo);

  const controlFirebase = useFirebase();

  useEffect(() => {
    setSpeed(data.current);
  }, [data.current]);

  useEffect(() => {
    setTempLevelOne(data.one.max);
  }, [data.one]);

  useEffect(() => {
    setTempLevelTwo(data.two.max);
  }, [data.two]);

  useEffect(() => {
    controlFirebase.handleGetDataOnOff();
  }, []);
  return (
    <ControlBar
      auto={data.auto}
      setAutoFb={controlFirebase.handleChangeSpeedAuto}
    >
      <ControlBar.Header title={`Fan speed adjustment | ${speed}`}>
        <ControlBar.Switch />
      </ControlBar.Header>
      <ControlBar.ManualMode>
        <ControlBar.Body>
          {[1, 2, 3].map((item) => {
            return (
              <ControlBar.Item
                icon={item.toString()}
                key={item}
                onClick={() => {
                  controlFirebase.handleChangeSpeed(item);
                }}
                mode={item === speed ? "filled" : "outlined"}
              />
            );
          })}
        </ControlBar.Body>
      </ControlBar.ManualMode>
      <ControlBar.AutoMode>
        <div className="flex font-bold my-1">
          <div className="w-1/5">Speed</div>
          <div className="flex-1 text-center flex justify-between pl-4">
            <span className="text-sky-600 text-sm">0°C</span>
            <span>Temperature</span>
            <span className="text-sky-600 text-sm">50°C</span>
          </div>
        </div>
        <AdjustItem title="Level 1">
          <Slider
            max={MAX_TEMP}
            valueLabelDisplay="auto"
            aria-label="pretto slider"
            value={tempLevelOne}
            onChange={(e, value) => {
              controlFirebase.handleChangeLevelOne(value as number);
              // setTempLevelOne(value as number);
            }}
          />
        </AdjustItem>
        <AdjustItem title="Level 2">
          <Slider
            max={MAX_TEMP}
            valueLabelDisplay="auto"
            aria-label="pretto slider"
            // value={[tempLevelOne + 1, tempLevelThree - 1]}
            value={[tempLevelOne + 1, tempLevelTwo]}
            onChange={(value) => {
              if (!Array.isArray(value)) {
                return;
              }

              setTempLevelOne(value[0] - 1 < 0 ? 0 : value[0] - 1);
              controlFirebase.handleChangeLevelTwo(value[1]);
              // setTempLevelThree(value[1] + 1);
            }}
          />
        </AdjustItem>
        {/* <AdjustItem title="Level 3">
          <Slider
            max={MAX_TEMP}
            valueLabelDisplay="auto"
            aria-label="pretto slider"
            // value={tempLevelThree}
            value={tempLevelTwo + 1}
            onChange={(e, value) => {
              setTempLevelThree(value as number);
            }}
            track="inverted"
          />
        </AdjustItem> */}
      </ControlBar.AutoMode>
    </ControlBar>
  );
};

function AdjustItem({
  children,
  title,
}: {
  children?: React.ReactNode;
  title?: string;
}) {
  return (
    <div className="flex items-center">
      <div className="w-1/5">
        <span>{title}</span>
      </div>
      <div className="flex-1 flex items-center gap-2 pl-6">{children}</div>
    </div>
  );
}
