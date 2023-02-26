import React from 'react';
import Homepage from './Homepage';
import createRGB from 'utils/createRGB';

const HomepageC = () => {    
	const targetColor = createRGB(target);
    
	const gameState = {
		userId,
		width,
		height,
		movesLeft,
		targetColor,
	};
    
	const gameActions = [setMovesLeft];

	return (
		<Homepage gameState={gameState} gameActions={gameActions} />
	);
};

export default HomepageC;