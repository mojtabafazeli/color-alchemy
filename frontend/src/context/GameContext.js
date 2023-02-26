import React, { useState, useContext, createContext, useMemo, useEffect } from 'react';
import { node } from 'prop-types';
import { INIT_URL } from 'constants/apiConstants';

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
	const [gameState, setGameState] = useState({});
	const GameState = useMemo(() => gameState, [gameState]);
	const GameActions = useMemo(() => ({ setGameState }), []);
	const [fetchedState, setFetchedState] = useState({});
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
    
	const gameStateValue = useMemo(() => gameState, [gameState]);
	const gameActionsValue = useMemo(() => ({ setGameState }), []);

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