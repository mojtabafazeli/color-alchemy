import './Sources.scss';
import React, { useState } from 'react';
import { string, number, func } from 'prop-types';
import noop from 'lodash/noop';
import classNames from 'classnames';
import Source from 'components/ColorBox/Source';
import { BLACK, RED, GREEN, BLUE } from 'constants/colorConstants';

const createId = (ind, position, width, height) => {
	let xPos = ind+1;
	let yPos = ind+1;
	switch (position) {
	case 'top':
		yPos = 0;
		break;
	case 'bottom':
		yPos = height + 1;
		break;
	case 'left':
		xPos = 0;
		break;
	case 'right':
		xPos = width + 1;
		break;
	}

	return `${xPos}-${yPos}`;
};

const Sources = (
	{
		width,
		height,
		setMovesLeft= noop,
	}
) => {
	const [counter, setCounter] = useState(3);

	const onClickSource = (ind, position) => {
		if (counter === 0) return;
		setMovesLeft(prev => {
			if (prev < 0) return;
			return prev-1;
		});
		setCounter(prev => prev - 1);
	};

	const setColor = () => {
		switch (counter) {
		case 2: return RED;
		case 1: return GREEN;
		case 0: return BLUE;
		default: return BLACK;
		}
	};

	const SourcesRow = (
		{
			length,
			position,
		}
	) => {
		const ulClassName = classNames('Sources sources', position);
		const sourceClassName = classNames({
			'pointer': !!counter,
			'non-pointer': !counter
		});
		return (
			<ul className={ulClassName}>
				{[...Array(length)].map((_, ind) => (
					<Source
						color={setColor()}
						id={createId(ind, position,width, height)}
						className={sourceClassName}
						key={ind}
						onClick={() => onClickSource(ind, position)}
					/>
				)
				)}
			</ul>
		);
	};

	SourcesRow.propTypes = {
		length: number,
		position: string,
	};

	return (
		<>
			<SourcesRow length={width} position='top' />
			<SourcesRow length={height} position='left' />
			<SourcesRow length={height} position='right' />
			<SourcesRow length={width} position='bottom' />
		</>
	);
};

Sources.propTypes = {
	width: number,
	height: number,
	setMovesLeft: func,
};

export default Sources;