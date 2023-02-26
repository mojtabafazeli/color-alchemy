import './App.css';
import React from 'react';
import HomepageC from 'components/Homepage/HomepageC';
import GameContext from 'context/GameContext';
import ColorContext from 'context/ColorContext';

function App() {
	return (
		<div className="App">
			<GameContext>
				<ColorContext>
					<HomepageC />
				</ColorContext>
			</GameContext>
		</div>
	);
}

export default App;
