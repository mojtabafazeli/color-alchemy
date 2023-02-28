import './Tiles.scss';
import React from 'react';
import { number, string } from 'prop-types';
import classNames from 'classnames';
import Tile from 'components/ColorBox/Tile';
import { useColorState } from 'context/ColorContext';
import getColor from 'utils/color/getColor';
import getRGBString from 'utils/color/getRGBString';
import { BLACK } from 'constants/colorConstants';

const Tiles = (
	{
		width,
		height,
		className: propClassName,
	}) => {
	const gridTemplateColumns = `repeat(${width}, 1fr)`;
	const gridTemplateRows = `repeat(${height}, 1fr)`;
	const tilesClassName = classNames('Tiles', propClassName);
	const { tilesColorsSet, closestId } = useColorState();
	const tileNumbers = width * height || 0;
    
	return (
		<ul
			style={
				{
					gridTemplateColumns: gridTemplateColumns,
					gridTemplateRows: gridTemplateRows,
				}
			}
			className={tilesClassName}
		>
			{[...Array(tileNumbers)].map((el, ind) => {
				const id = createId(ind, width, height);
				const color = getColor(tilesColorsSet, id);
				const tooltip = getRGBString(color);
				const className = id === closestId && color !== BLACK ? 'bordered' : '';
				return (
					<Tile
						className={className}
						id={id}
						key={id}
						color={color}
						tooltip={tooltip}
					/>
				);
			})}
		</ul>
	);

};

Tiles.propTypes = {
	width: number,
	height: number,
	className: string
};

export default Tiles;

function createId (ind, width, height) {
	const xPos = (ind + 1) % width === 0 ? width : (ind + 1) % width;
        
	const tempYPos = (ind + 1) % width === 0 ? (ind + 1) / width : (Math.floor((ind + 1) / width) + 1) % height;
	const yPos = tempYPos === 0 ? height : tempYPos;
        
	return `${xPos}-${yPos}`;
}
