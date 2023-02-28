import getRGBString from 'utils/color/getRGBString';

const calcDelta = (colorA, colorB) => {
	const colA = getRGBString(colorA).split(',');
	const colB = colorB;

	const [r1, g1, b1] = colA;
	const [r2, g2, b2] = colB;

	const delta = (1 / 255)
		* (1 / Math.sqrt(3))
		* (Math.sqrt(
			(
				Math.pow(+r1 - +r2, 2)
				* Math.pow(+g1 - +g2, 2)
				*Math.pow(+b1 - +b2, 2)
			)
		)
		)/100;

	return delta;
};

export default calcDelta;