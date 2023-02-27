import { MAX_FACTOR } from 'constants/colorConstants';
import getRGBString from 'utils/color/getRGBString';

const calcRGB = (tileColor, sourceColor, ind, l) => {
	const sColArr = getRGBString(sourceColor).split(',');
	const sr = +sColArr[0];
	const sg = +sColArr[1];
	const sb = +sColArr[2];

	const tColArr = getRGBString(tileColor).split(',');
	const tr = +tColArr[0];
	const tg = +tColArr[1];
	const tb = +tColArr[2];

	let r = (sr + tr); 
	let g = (sg + tg);
	let b = (sb + tb);

	const f = MAX_FACTOR(r, g, b);
	r = r * f;
	g = g * f;
	b = b * f;

	return `rgb(${Math.floor(r*ind/l)},${Math.floor(g*ind/l)},${Math.floor(b*ind/l)})`;
};

export default calcRGB;