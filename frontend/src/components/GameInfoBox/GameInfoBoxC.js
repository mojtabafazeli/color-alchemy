import React from 'react';
import { string, array } from 'prop-types';
import GameInfoBox from './GameInfoBox';


const GameInfoBoxC = ({ target, ...props }) => {

	return (
		<GameInfoBox
			target={target}
			closestColor={''}
			closestColorTooltip={''}
			delta={''}
			{...props}
		/>
	);
};

GameInfoBoxC.propTypes = {
	target: array, 
	closestColor: string,
};

export default GameInfoBoxC;


