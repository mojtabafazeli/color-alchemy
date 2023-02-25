import React from 'react';
import { string } from 'prop-types';
import GameInfoBox from './GameInfoBox';

const GameInfoBoxC = ({ userId, targetColor, closestColor }) => {
	return (
		<GameInfoBox
			userId={userId}
			targetColor={targetColor}
			closestColor={closestColor}
		/>
	);
};

GameInfoBoxC.propTypes = {
	userId: string,
	targetColor: string,
	closestColor: string,
};

export default GameInfoBoxC;
