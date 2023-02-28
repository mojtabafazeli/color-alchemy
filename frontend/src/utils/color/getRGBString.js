const getRGBString = (color) => {
	return color?.slice(4, color?.length - 1) || ('0,0,0');
};

export default getRGBString;