import { getDatabase, ref, set, child, get } from "firebase/database";

const useFirebase = () => {
  // const [curTemperature, setCurTemperature] = useState(32);

  // useEffect(() => {
  // 	const interval = setInterval(() => {
  // 		handleUpdateTemperature();
  // 	}, UPDATE_TEMPERATURE_TIMESTAMP);
  // 	return () => clearInterval(interval);
  // }, []);

  // useEffect(() => {
  // 	const starCountRef = ref(db, '/fan');
  // 	onValue(starCountRef, (snapshot) => {
  // 		const data = snapshot.val();
  // 		console.log('data', data);
  // 	});
  // }, []);

  const handleGetDataOnOff = () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `temp/current`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          return snapshot.val();
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

    // const db = getDatabase();

    // const starCountRef = ref(db, "fan/auto");
    // // return db.fan.enable;
    // console.log("db", starCountRef);
  };

  const handleOnOffFan = (fanEnable: boolean) => {
    console.log("first");
    const db = getDatabase();
    set(ref(db, "fan/enable"), fanEnable);
  };

  const handleChangeAutoOnOff = (auto: boolean) => {
    const db = getDatabase();
    set(ref(db, "fan/auto"), auto);
  };

  const handleChangeSpeed = (speed: number) => {
    const db = getDatabase();
    set(ref(db, "speed/current"), speed);
  };

  const handleChangeSpeedAuto = (auto: boolean) => {
    const db = getDatabase();
    set(ref(db, "speed/auto"), auto);
  };

  const handleChangeAngel = (angle: number) => {
    const db = getDatabase();
    set(ref(db, "angle/current"), angle);
  };

  const handleChangeAngelSpeed = (speed: number) => {
    const db = getDatabase();
    set(ref(db, "angle/speed"), speed);
  };
  const handleChangeAngelAuto = (auto: boolean) => {
    const db = getDatabase();
    set(ref(db, "angle/auto"), auto);
  };

  const handleEnableTimer = (timerEnable: boolean) => {
    const db = getDatabase();
    set(ref(db, "timer/enable"), timerEnable);
  };

  const handleSetStartTimer = (time: string) => {
    const db = getDatabase();
    set(ref(db, "timer/start"), time);
  };

  const handleSetEndTimer = (time: string) => {
    const db = getDatabase();
    set(ref(db, "timer/end"), time);
  };

  const handleEnableTempControl = (tempEnable: boolean) => {
    const db = getDatabase();
    set(ref(db, "temp/enable"), tempEnable);
  };

  const handleSetTempThreshold = (threshold: number) => {
    const db = getDatabase();
    set(ref(db, "temp/threshold"), threshold);
  };

  return {
    // curTemperature,
    handleGetDataOnOff,
    handleChangeAutoOnOff,
    handleOnOffFan,
    handleEnableTimer,
    handleSetStartTimer,
    handleSetEndTimer,
    handleEnableTempControl,
    handleSetTempThreshold,
    handleChangeSpeed,
    handleChangeSpeedAuto,
    handleChangeAngel,
    handleChangeAngelAuto,
    handleChangeAngelSpeed,
  };
};

export default useFirebase;
