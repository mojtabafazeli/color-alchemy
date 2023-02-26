import './App.css';
import React from 'react';
import HomepageC from 'components/Homepage/HomepageC';
import ColorContext from 'context/ColorContext';

function App() {
	return (
		<div className="App">
			<ColorContext>
				<HomepageC />
			</ColorContext>
		</div>
	);
}

export default App;
