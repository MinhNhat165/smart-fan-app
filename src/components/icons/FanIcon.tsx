import { SVGAttributes } from 'react';

export function FanIcon(props: SVGAttributes<SVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 96 960 960"
			fill="currentColor"
			{...props}
		>
			<path d="M480 576q0-91 64.5-155.5T700 356q91 0 155.5 64.5T920 576H480zM260 796q-91 0-155.5-64.5T40 576h440q0 91-64.5 155.5T260 796zm220-220q-91 0-155.5-64.5T260 356q0-91 64.5-155.5T480 136v440zm0 440V576q91 0 155.5 64.5T700 796q0 91-64.5 155.5T480 1016z"></path>
		</svg>
	);
}
