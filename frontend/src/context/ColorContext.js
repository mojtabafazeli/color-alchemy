import React, { useState, useContext, createContext, useMemo } from 'react';
import { node } from 'prop-types';
import { useGameState } from 'context/GameContext';
import { BLACK } from 'constants/colorConstants';

const createColorMap = (width, height) => {
	let colorMap = {};
	for (let i = 0; i <= width + 1; i++) {
		for (let j = 0; j <= height + 1; j++) {
			colorMap[`${i}-${j}`] = BLACK;
		}
	}

	delete colorMap['0-0'];

	return colorMap;
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

	const [colorSet, setColorSet] = useState(createColorMap(width, height));
	const colorStateValue = useMemo(() => colorSet, [colorSet]);
	const colorActionsValue = useMemo(() => ({ setColorSet }), []);

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