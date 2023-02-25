import React, {useState, useEffect} from 'react';
import Homepage from './Homepage';
import createRGB from 'utils/createRGB';
import { INIT_URL } from 'constants/apiConstants';


const HomepageC = () => {
	const [fetchedState, setFetchedState] = useState({});
	const { userId, width, height, target } = fetchedState;
	const [movesLeft, setMovesLeft] = useState();

	useEffect(() => {
		fetch(INIT_URL)
			.then(res => res.json())
			.then(res => {
				setFetchedState(res);
				const { maxMoves } = res;
				setMovesLeft(maxMoves);
			});
	}, []);
    
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