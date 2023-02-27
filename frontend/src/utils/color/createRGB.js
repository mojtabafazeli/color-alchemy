const createRGB = (targetArray) => {
	if (!Array.isArray(targetArray)) return;
	const r = targetArray[0] || 0;
	const b = targetArray[1] || 0;
	const g = targetArray[2] || 0;

	return `rgb(${r}, ${g}, ${b})`;
};

export default createRGB;