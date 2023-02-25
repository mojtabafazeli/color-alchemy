import React, {useState, useEffect} from 'react';
import Homepage from './Homepage';
import createRGB from 'utils/createRGB';

const HomepageC = () => {
	const [fetchedState, setFetchedState] = useState({});

	useEffect(() => {
		fetch('http://localhost:9876/init')
			.then(res => res.json())
			.then(setFetchedState);
	}, []);

	const { target } = fetchedState;
	const targetColor = createRGB(target);
    
	const gameState = {
		...fetchedState,
		targetColor,
	};

	return (
		<Homepage gameState={gameState} />
	);
};

export default HomepageC;