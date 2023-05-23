import { onValue, ref } from "firebase/database";

import { useEffect, useState } from "react";
import { Fan as FanUi } from "../components/Fan";
import { ArrowLeftOnRectangleIcon } from "../components/icons";
import { AngleControlBar } from "../features/angle";
import { OnOfControlBar } from "../features/on-off";
import { SpeedControlBar } from "../features/speed";
import { auth, db } from "../lib/firebase";
import { useChangeAngle, useChangeSpeed, useOnOfFan } from "../store/FanState";
import { Angle } from "../types/angle";
import { Fan } from "../types/fan";
import { Speed } from "../types/speed";
import { Temp } from "../types/temp";
import { onAuthStateChanged, signOut } from "firebase/auth";

const HomePage = () => {
  const [authUser, setAuthUser] = useState<any>();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      console.log("hihi");
      if (user) {
        console.log("hihi2", user);
        setAuthUser(user);
      } else {
        window.location.href = "/auth/login";
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  });
  useEffect(() => {
    if (authUser === null) {
      window.location.href = "/auth/login";
    }
  }, [authUser]);

  const { setAuto, setEnable } = useOnOfFan();
  const { data, setCurrentSpeed, setAutoSpeed, setMaxOne, setMaxTwo } =
    useChangeSpeed();
  const { setCurrentAngle, setAutoAngle, setSpeedAngle } = useChangeAngle();
  const [temp, setTemp] = useState<number>(29);
  useEffect(() => {
    const starCountRef = ref(db, "/temp");
    onValue(starCountRef, (snapshot) => {
      const data: Temp = snapshot.val();
      setTemp(data.current);
    });
  }, []);

  useEffect(() => {
    const starCountRef = ref(db, "/fan");
    onValue(starCountRef, (snapshot) => {
      const data: Fan = snapshot.val();
      setEnable(data.enable);
      setAuto(data.auto);
    });
  }, []);

  useEffect(() => {
    const starCountRef = ref(db, "/speed");
    onValue(starCountRef, (snapshot) => {
      const data: Speed = snapshot.val();
      setCurrentSpeed(data.current);
      setAutoSpeed(data.auto);
      setMaxOne(data.one.max);
      setMaxTwo(data.two.max);
    });
  }, []);

  useEffect(() => {
    const starCountRef = ref(db, "/angle");
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
        window.location.href = "/auth/login";
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
        <div>
          <div className="w-full flex justify-self-center justify-center mb-4">
            <FanUi />
          </div>
          <div className="flex justify-center px-10 pb-2 gap-2">
            <div className="text-slate-600 w-32 text-center">
              <div className="text-3xl">{temp}</div>
              <div>Temperature (°C)</div>
            </div>
            <div className="w-0.5 h-full bg-slate-200 rounded-lg"></div>
            <div className="text-slate-600 w-32 text-center">
              <div className="text-3xl">{data.current}</div>
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
