import React from 'react';
import Board from './Board';
import { useGameUpdater } from 'context/GameContext';

const BoardC = (props) => {
	const { setMovesLeft } = useGameUpdater();

	const gameActions = [setMovesLeft];
	
	return (
		<Board {...props} gameActions={gameActions} />
	);
};

export default BoardC;