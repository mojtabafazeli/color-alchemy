import './Tiles.scss';
import React, {useCallback} from 'react';
import { number, string } from 'prop-types';
import classNames from 'classnames';
import Tile from 'components/ColorBox/Tile';
import { useColorState } from 'context/ColorContext';
import { BLACK } from 'constants/colorConstants';

const createId = (ind, x, y) => {
	const xPos = (ind + 1) % x === 0 ? x : (ind + 1) % x;
        
	const tempYPos = (ind + 1) % x === 0 ? (ind + 1) / x : (Math.floor((ind + 1) / x) + 1) % y;
	const yPos = tempYPos === 0 ? y : tempYPos;
        
	return `${xPos}-${yPos}`;
};

const Tiles = (
	{
		width,
		height,
		className: propClassName,
	}) => {
	const gridTemplateColumns = `repeat(${width}, 1fr)`;
	const gridTemplateRows = `repeat(${height}, 1fr)`;
	const tilesClassName = classNames('Tiles', propClassName);
	const { colorSet } = useColorState();
	const tileNumbers = width * height || 0;

	const getTooltip = useCallback((id) => {
		const color = colorSet ? colorSet[id] : BLACK;
		return color && color.slice(4, color?.length - 1);
	}, [colorSet]);
    
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
				return (
					<Tile
						id={id}
						key={ind}
						tooltip={getTooltip(id)}
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