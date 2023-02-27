const calcRGB = (rgb, ind, l) => {
	const sColArr = rgb.slice(4, -1).split(',');
	const r = +sColArr[0];
	const g = +sColArr[1];
	const b = +sColArr[2];
	return `rgb(${Math.floor(r*ind/l)},${Math.floor(g*ind/l)},${Math.floor(b*ind/l)})`;
};

export default calcRGB;