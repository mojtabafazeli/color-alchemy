import React, { useState, useEffect, useContext, createContext, useMemo } from 'react';
import { node } from 'prop-types';
import { useGameState } from 'context/GameContext';
import { BLACK } from 'constants/colorConstants';
const createTileColorSet = (width, height) => {
	let tileColorMap = {};
	for (let i = 1; i <= width; i++) {
		for (let j = 1; j <= height; j++) {
			tileColorMap[`${i}-${j}`] = BLACK;
		}
	}
	return tileColorMap;
};

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

	const resetColorSet = () => {
		updateTilesColorsSet();
		updateTilesColorsSet();
	};

	const colorStateValue = useMemo(() => ({ tilesColorsSet, sourcesColorsSet }), [tilesColorsSet, sourcesColorsSet]);
	const colorActionsValue = useMemo(() => ({ updateTilesColorsSet, updateSourcesColorsSet, resetColorSet }), []);
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