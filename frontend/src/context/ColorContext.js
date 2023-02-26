import React, { useState, useContext, createContext, useMemo } from 'react';
import { node } from 'prop-types';

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
	const [colorSet, setColorSet] = useState({});
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