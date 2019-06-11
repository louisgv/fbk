import { useState } from "react";

export const useLogState = (tag, defaultValue = "hello", defaultColor = "white") => {
	const [log, setLogRaw] = useState(`${tag}\t | ${defaultValue}`);

	const setLog = s => setLogRaw(`${tag}\t | ${s}`);

	const [color, setColor] = useState(defaultColor);

	return [log, setLog, color, setColor];
};
