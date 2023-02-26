import './Board.scss';
import React from 'react';
import Sources from 'components/Sources/Sources';
import Tiles from 'components/Tiles/Tiles';
import { number, func } from 'prop-types';

const Board = ({
	width,
	height,
	setMoves,
}) => {
	const Columns = new Array(height);

	return (
		<div className='Board'>
			<div className='boardGrid'>
				<Sources length={width} position='top' direction='row' />
				<Sources length={height} position='left' direction='column' />
				<Sources length={height} position='right' direction='column'/>
				<Sources length={width} position='bottom' direction='row' />
				<Tiles x={width} y={height} className={'tiles'} />
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