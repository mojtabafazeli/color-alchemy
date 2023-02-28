import React, { useState, useContext, createContext, useMemo, useEffect } from 'react';
import { node } from 'prop-types';
import { INIT_URL } from 'constants/apiConstants';
import { RESET_URL } from '../constants/apiConstants';

const GameStateContext = createContext(null);
const GameUpdaterContext = createContext(null);

const useGameState = () => {
	const context = useContext(GameStateContext);

	if (context === undefined) {
		throw new Error('GameStateContext was used outside of its Provider');
	}

	return context;
};

const useGameUpdater = () => {
	const context = useContext(GameUpdaterContext);

	if (context === undefined) {
		throw new Error('GameUpdaterContext was used outside of its Provider');
	}

	return context;
};

const GameContext = ({ children }) => {
	const [fetchedGameState, setGameState] = useState({});
	const [movesLeft, setMovesLeft] = useState();

	const resetGame = (id) => {
		const url = RESET_URL(id);
		fetch(url)
			.then(res => res.json())
			.then(res => {
				setGameState(res);
				const { maxMoves } = res;
				setMovesLeft(maxMoves);
			});
	};

	useEffect(() => {
		fetch(INIT_URL)
			.then(res => res.json())
			.then(res => {
				setGameState(res);
				const { maxMoves } = res;
				setMovesLeft(maxMoves);
			});
	}, []);
    
	const gameStateValue = useMemo(() => (
		{
			fetchedGameState,
			movesLeft
		}
	)
	, [
		fetchedGameState,
		movesLeft
	]);
    
	const gameActionsValue = useMemo(() => (
		{
			setGameState,
			setMovesLeft,
			resetGame
		}
	), [
		setGameState,
		setMovesLeft,
		resetGame
	]);

	return (
		<GameStateContext.Provider value={gameStateValue}>
			<GameUpdaterContext.Provider value={gameActionsValue}>
				{children}
			</GameUpdaterContext.Provider>
		</GameStateContext.Provider>
	);
};

GameContext.propTypes = {
	children: node.isRequired,
};

export default GameContext;

export {
	useGameState,
	useGameUpdater,
};