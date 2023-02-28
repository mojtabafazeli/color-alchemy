import React, { useState } from 'react';
import { string, array } from 'prop-types';
import GameInfoBox from './GameInfoBox';
import { useColorState } from 'context/ColorContext';
import getRGBString from 'utils/color/getRGBString';
import { BLACK, INITIAL_DELTA } from 'constants/colorConstants';


const GameInfoBoxC = ({ target, ...props }) => {
	const [delta, setDelta] = useState(INITIAL_DELTA);
	const [closestColor, setClosestColor] = useState(BLACK);
	const { colorSet} = useColorState();
	const closestColorTooltip = getRGBString(closestColor);

	const tilesColorsArray = colorSet && Object.values(colorSet);
	tilesColorsArray?.forEach(c => {
		if (c === 'rgb(0,0,0)') return;
		const d = calcDelta(c, target);
		// console.log(d, delta);
		// if (d <= delta) {
		// 	setClosestColor(c);
		// 	setDelta(d);
		// }
	});

	return (
		<GameInfoBox
			target={target}
			closestColor={closestColor}
			closestColorTooltip={closestColorTooltip}
			delta={delta === INITIAL_DELTA ? null : delta}
			{...props}
		/>
	);
};

GameInfoBoxC.propTypes = {
	target: array, 
	closestColor: string,
};

export default GameInfoBoxC;

function calcDelta (colorA, colorB) {
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
}
