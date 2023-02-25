import React from 'react';
import GameInfoBox from 'components/GameInfoBox/GameInfoBox';
import BoardC from 'components/Board/BoardC';

const Homepage = () => {
	return (
		<div className='Board'>
			<GameInfoBox />
            
			<BoardC />
		</div>
	);
};

export default Homepage;