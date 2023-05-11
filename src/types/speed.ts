type TempRange = {
	min: number;
	max: number;
};

export type Speed = {
	auto: boolean;
	current: number;
	one: TempRange;
	two: TempRange;
	three: TempRange;
};
