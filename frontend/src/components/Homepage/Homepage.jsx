import React from 'react';
import { object, array } from 'prop-types';
import GameInfoBox from 'components/GameInfoBox/GameInfoBox';
import BoardC from 'components/Board/BoardC';

const Homepage = ({
	gameState,
	gameActions,
}) => {
	const {
		userId,
		width,
		height,
		targetColor,
		movesLeft,
	} = gameState;
    
	const [setMovesLeft] = gameActions;

	return (
		<div className='Board'>
			<GameInfoBox
				userId={userId}
				targetColor={targetColor}
				movesLeft={movesLeft}
			/>
            
			<BoardC width={width} height={height} setMoves={setMovesLeft} />
		</div>
	);
};

Homepage.propTypes = {
	gameState: object,
	gameActions: array,
};

export default Homepage;