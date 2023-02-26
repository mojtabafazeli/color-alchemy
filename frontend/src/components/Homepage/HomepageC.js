import React from 'react';
import Homepage from './Homepage';
import { useGameState } from 'context/GameContext';
import createRGB from 'utils/createRGB';

const HomepageC = () => {  
	const { fetchedGameState: gameState, movesLeft } = useGameState();
	const { target } = gameState;
	const targetColor = createRGB(target);

	return (
		<Homepage gameState={{ ...gameState, targetColor, movesLeft }} />
	);
};

export default HomepageC;