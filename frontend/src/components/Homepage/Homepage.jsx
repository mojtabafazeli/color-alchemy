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
	} = gameState;

	return (
		<div className='Board'>
			<GameInfoBox
				userId={userId}
				targetColor={targetColor}
			/>
            
			<BoardC width={width} height={height} />
		</div>
	);
};

Homepage.propTypes = {
	gameState: object,
};

export default Homepage;