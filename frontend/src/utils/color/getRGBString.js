const getRGBString = (color) => {
	if (!color) return '';
	return color.slice(4, color?.length - 1);
};

export default getRGBString;