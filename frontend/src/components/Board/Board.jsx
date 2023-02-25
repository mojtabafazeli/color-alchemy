import './Board.scss';
import React from 'react';
import classNames from 'classnames';
import Tile from 'components/ColorBox/Tile';
import Source from 'components/ColorBox/Source';
import { number, func } from 'prop-types';

const Board = ({
	width,
	height,
	setMoves,
}) => {
	const onClickSource = () => {
		setMoves(prev => {
			if (prev === 0) return;
			return prev-1;
		});
	};

	const Sources = ({ position, direction }) => {
		const ulClassName = classNames('sources', position, direction);
		return (
			<ul className={ulClassName}>
				{[...Array(width)].map((_, ind) => <Source key={ind} />)}
			</ul>
		);
	};

	const Columns = new Array(height);

	return (
		<div className='Board'>
			<div className='boardGrid'>
				<Sources position='top' direction='row' />
				<Sources position='left' direction='column' />
				<Sources position='right' direction='column'/>
				<Sources position='bottom' direction='row'/>
			</div>
		</div>
	);
};

Board.propTypes = {
	width: number,
	height: number,
	setMoves: func,
};

export default Board;