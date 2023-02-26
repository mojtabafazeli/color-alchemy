import React from 'react';
import { object } from 'prop-types';
import GameInfoBox from 'components/GameInfoBox/GameInfoBox';
import BoardC from 'components/Board/BoardC';

const Homepage = ({
	gameState,
}) => {
	const {
		userId,
		width,
		height,
		targetColor,
		movesLeft,
	} = gameState;

	return (
		<div className='Board'>
			<GameInfoBox
				userId={userId}
				targetColor={targetColor}
				movesLeft={movesLeft}
			/>
            
			<BoardC width={width} height={height} />
		</div>
	);
};

Homepage.propTypes = {
	gameState: object,
};

export default Homepage;