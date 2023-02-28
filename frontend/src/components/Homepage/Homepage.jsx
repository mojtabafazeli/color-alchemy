import React from 'react';
import { object } from 'prop-types';
import GameInfoBoxC from 'components/GameInfoBox/GameInfoBoxC';
import BoardC from 'components/Board/BoardC';

const Homepage = ({
	gameState,
}) => {
	const {
		userId,
		width,
		height,
		target,
		targetColor,
		movesLeft,
	} = gameState;

	return (
		<div className='Board'>
			<GameInfoBoxC
				userId={userId}
				target={target}
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