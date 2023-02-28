import React from 'react';
import { string, array } from 'prop-types';
import GameInfoBox from './GameInfoBox';
import { useColorState } from 'context/ColorContext';
import getRGBString from 'utils/color/getRGBString';


const GameInfoBoxC = ({ target, ...props }) => {
	const { tilesColorsSet, delta, closestId } = useColorState(); 
	const closestColor = tilesColorsSet?.[closestId];
	const closestTooltip = getRGBString(closestColor);

	return (
		<GameInfoBox
			target={target}
			closestColor={closestColor}
			closestColorTooltip={closestTooltip}
			delta={delta}
			{...props}
		/>
	);
};

GameInfoBoxC.propTypes = {
	target: array, 
	closestColor: string,
};

export default GameInfoBoxC;


