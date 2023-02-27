import React from 'react';
import { string } from 'prop-types';
import ColorBox from './ColorBox';
import { ColorBoxType } from 'constants/constants';


const Tile = ({ color, ...props }) => {
	const onDragStart = (e) => {
		e.preventDefault();
		e.dataTransfer.setData('color', color);
	};

	return (
		<ColorBox
			{...props}
			color={color}
			type={ColorBoxType.TILE}
			onDragStart={(e) => onDragStart(e)}
			draggable
		/>
	); 
};


Tile.propTypes = {
	color: string,
};

export default Tile;