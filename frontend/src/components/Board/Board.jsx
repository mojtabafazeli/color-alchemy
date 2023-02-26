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
	return (
		<div className='Board'>
			<div className='boardGrid'>
				<Sources length={width} position='top'/>
				<Sources length={height} position='left'/>
				<Sources length={height} position='right'/>
				<Sources length={width} position='bottom'/>
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