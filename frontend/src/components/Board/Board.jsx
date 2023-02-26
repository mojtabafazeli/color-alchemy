import './Board.scss';
import React from 'react';
import Sources from 'components/Sources/Sources';
import Tiles from 'components/Tiles/Tiles';
import { number, array } from 'prop-types';

const Board = ({
	width,
	height,
	gameActions = [],
}) => {
	const [setMovesLeft] = gameActions;

	return (
		<div className='Board'>
			<div className='boardGrid'>
				<Sources width={width} height={height} setMovesLeft={setMovesLeft}/>
				<Tiles x={width} y={height} className={'tiles'} setMovesLeft={setMovesLeft}/>
			</div>
		</div>
	);
};

Board.propTypes = {
	width: number,
	height: number,
	gameActions: array,
};

export default Board;