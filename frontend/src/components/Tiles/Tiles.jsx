import './Tiles.scss';
import React from 'react';
import { number, string } from 'prop-types';
import classNames from 'classnames';
import Tile from 'components/ColorBox/Tile';

const Tiles = (
	{
		x,
		y,
		className: propClassName,
	}) => {
	const gridTemplateColumns = `repeat(${x}, 1fr)`;
	const gridTemplateRows = `repeat(${y}, 1fr)`;
	const tilesClassName = classNames('Tiles', propClassName);
	const tileNumbers = x * y || 0;
    
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
			{[...Array(tileNumbers)].map((el, ind) => (
				<Tile key={ind} />
			))}
		</ul>
	);

};

Tiles.propTypes = {
	x: number,
	y: number,
	className: string
};

export default Tiles;