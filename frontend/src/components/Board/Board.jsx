import React from 'react';
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

	const Rows = new Array(width);
	const Columns = new Array(height);

	return (
		<div className='Board'>

		</div>
	);
};

Board.propTypes = {
	width: number,
	height: number,
	setMoves: func,
};

export default Board;