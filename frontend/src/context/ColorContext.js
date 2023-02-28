import React, { useState, useEffect, useContext, createContext } from 'react';
import { node } from 'prop-types';
import { useGameState } from 'context/GameContext';
import calcDelta from 'utils/color/calcDelta';

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
	const { target } = gameState;
	const [tilesColorsSet, updateTilesColorsSet] = useState();
	const [sourcesColorsSet, updateSourcesColorsSet] = useState();
	const [delta, setDelta] = useState(calcDelta('0,0,0', target));
	const [closestId, setClosestId] = useState();

	const resetColorSet = () => {
		setDelta(calcDelta('0,0,0', target));
		updateTilesColorsSet(null);
		updateSourcesColorsSet(null);
	};

	const colorStateValue = { tilesColorsSet, sourcesColorsSet, delta, closestId };
	const colorActionsValue = { updateTilesColorsSet, updateSourcesColorsSet, setDelta, setClosestId, resetColorSet };
	useEffect(() => {
		setDelta(calcDelta('0,0,0', target));
	}, [target]);
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