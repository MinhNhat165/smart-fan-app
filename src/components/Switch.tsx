import { Switch as SwitchLib } from '@headlessui/react';
import { useState, useEffect } from 'react';

export interface SwitchProps {
	checked?: boolean;
	onChange?: (checked: boolean) => void;
}

export default function Switch({ checked = false, onChange }: SwitchProps) {
	const [enabled, setEnabled] = useState(checked);

	useEffect(() => {
		setEnabled(checked);
	}, [checked]);

	const handleOnChange = () => {
		setEnabled(!enabled);
		onChange && onChange(!enabled);
	};

	return (
		<SwitchLib
			checked={enabled}
			onChange={handleOnChange}
			className={`${enabled ? 'bg-teal-500' : 'bg-gray-500'}
          relative inline-flex h-[24px] w-[48px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
		>
			<span
				aria-hidden="true"
				className={`${enabled ? 'translate-x-[24px]' : 'translate-x-0'}
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
			/>
		</SwitchLib>
	);
}
