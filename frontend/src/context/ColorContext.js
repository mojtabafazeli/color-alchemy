import React, { useState, useEffect, useContext, createContext, useMemo } from 'react';
import { node } from 'prop-types';
import { useGameState } from 'context/GameContext';
import { INITIAL_DELTA } from 'constants/constants';

const ColorStateContext = createContext(null);
const ColorUpdaterContext = createContext(null);

const useColorState = () => {
	const context = useContext(ColorStateContext);

	if (context === undefined) {
		throw new Error('ColorStateContext was used outside of its Provider');
	}

	return context;
};

const useColorUpdater = () => {
	const context = useContext(ColorUpdaterContext);

	if (context === undefined) {
		throw new Error('ColorUpdaterContext was used outside of its Provider');
	}

	return context;
};

const ColorContext = ({ children }) => {
	const { fetchedGameState: gameState } = useGameState();
	const { width, height } = gameState;
	const [tilesColorsSet, updateTilesColorsSet] = useState();
	const [sourcesColorsSet, updateSourcesColorsSet] = useState();
	const [delta, setDelta] = useState(INITIAL_DELTA);
	const [closestId, setClosestId] = useState();

	const resetColorSet = () => {
		updateTilesColorsSet(null);
		updateSourcesColorsSet(null);
	};

	const colorStateValue = useMemo(() => ({ tilesColorsSet, sourcesColorsSet, delta, closestId }), [tilesColorsSet, sourcesColorsSet]);
	const colorActionsValue = useMemo(() => ({ updateTilesColorsSet, updateSourcesColorsSet, setDelta, setClosestId, resetColorSet }), []);
	useEffect(() => {
		updateTilesColorsSet();
		updateTilesColorsSet();
	}, [width, height]);
	return (
		<ColorStateContext.Provider value={colorStateValue}>
			<ColorUpdaterContext.Provider value={colorActionsValue}>
				{children}
			</ColorUpdaterContext.Provider>
		</ColorStateContext.Provider>
	);
};

ColorContext.propTypes = {
	children: node.isRequired,
};

export default ColorContext;

export {
	useColorState,
	useColorUpdater,
};