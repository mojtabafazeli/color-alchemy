import React from 'react';
import ColorBox from './ColorBox';
import { ColorBoxType } from 'constants/constants';


const Tile = (props) => {
	return (
		<ColorBox
			{...props}
			type={ColorBoxType.TILE}
		/>
	); 
};

export default Tile;