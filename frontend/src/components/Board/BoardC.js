import React from 'react';
import Board from './Board';
import { useGameUpdater } from 'context/GameContext';
import { useColorUpdater } from 'context/ColorContext';

const BoardC = (props) => {
	const { setMovesLeft } = useGameUpdater();

	const gameActions = [setMovesLeft];
	
	return (
		<Board {...props} gameActions={gameActions} />
	);
};

export default BoardC;