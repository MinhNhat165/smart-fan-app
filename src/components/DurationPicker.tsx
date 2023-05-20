import { useState, useId } from "react";
import { addMinutes, addHours, format } from "date-fns";

interface DurationSelectorProps {
  onChange: (duration: string) => void;
}

const DurationSelector: React.FC<DurationSelectorProps> = ({ onChange }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  // const [seconds, setSeconds] = useState(0);

  const handleHoursChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(event.target.value);
    if (value > 23) {
      value = 23;
    }
    setHours(value);
  };

  const handleMinutesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(event.target.value);
    if (value > 59) {
      value = 59;
    }
    setMinutes(value);
  };

  // const handleSecondsChange = (
  // 	event: React.ChangeEvent<HTMLInputElement>,
  // ) => {
  // 	let value = Number(event.target.value);
  // 	if (value > 59) {
  // 		value = 59;
  // 	}
  // 	setSeconds(value);
  // };

  const formatDuration = (hours: number, minutes: number) => {
    const currentDateTime = new Date();
    const newDateTime = addHours(addMinutes(currentDateTime, minutes), hours);
    const formattedTime = format(newDateTime, "H:mm");

    // const formattedHours = hours > 0 ? `${hours}h ` : "";
    // const formattedMinutes = minutes > 0 ? `${minutes}m ` : "";
    // // const formattedSeconds = seconds > 0 ? `${seconds}s` : "";

    return formattedTime;
    //formattedHours + formattedMinutes;
  };

  const handleDurationChange = () => {
    const formattedDuration = formatDuration(hours, minutes);
    onChange(formattedDuration);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto p-4 rounded-lg shadow-md bg-white">
      <InputField label="Hours" value={hours} onChange={handleHoursChange} />

      <InputField
        label="Minutes"
        value={minutes}
        onChange={handleMinutesChange}
      />

      {/* <InputField
				label="Seconds"
				value={seconds}
				onChange={handleSecondsChange}
			/> */}

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
        onClick={handleDurationChange}
      >
        Set Timer
      </button>
    </div>
  );
};

export default DurationSelector;

function InputField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
}) {
  const id = useId();
  return (
    <div className="flex flex-row justify-between">
      <label className="text-gray-700 font-medium" htmlFor={id}>
        {label}
      </label>
      <input
        className="text-black transition-all bg-transparent w-20 rounded-md border-gray-400 border-2 p-2
        focus:outline-none focus:border-blue-500"
        type="number"
        id={id}
        name={id}
        min={0}
        max={59}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
