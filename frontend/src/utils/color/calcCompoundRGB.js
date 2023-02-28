import { MAX_FACTOR } from 'constants/colorConstants';
import getRGBString from 'utils/color/getRGBString';

const calcCompoundRGB = (tileColor, sourceColor, ind, l) => {
	const sColArr = getRGBString(sourceColor).split(',');
	const [sr, sg, sb] = sColArr;

	const tColArr = getRGBString(tileColor).split(',');
	const [tr, tg, tb] = tColArr;

	let r = (+sr + +tr); 
	let g = (+sg + +tg);
	let b = (+sb + +tb);

	const f = MAX_FACTOR(r, g, b);
	r = r * f;
	g = g * f;
	b = b * f;

	return `rgb(${Math.floor(r*ind/l)},${Math.floor(g*ind/l)},${Math.floor(b*ind/l)})`;
};

export default calcCompoundRGB;