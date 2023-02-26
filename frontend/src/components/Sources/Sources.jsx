import './Sources.scss';
import React, { useState, useCallback } from 'react';
import { string, number, func } from 'prop-types';
import noop from 'lodash/noop';
import classNames from 'classnames';
import Source from 'components/ColorBox/Source';
import { useColorState, useColorUpdater } from 'context/ColorContext';
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
	const { colorSet } = useColorState();

	const { updateColorSet } = useColorUpdater();

	const onClickSource = (id) => {
		if (counter === 0) return;
		setMovesLeft(prev => {
			if (prev < 0) return;
			return prev - 1;
		});
		setCounter(prev => prev - 1);
		updateColorSet(prev => ({ ...prev, [id]: setColor() }));
	};

	const setColor = useCallback(() => {
		switch (counter) {
		case 3: return RED;
		case 2: return GREEN;
		case 1: return BLUE;
		default: return BLACK;
		}
	}, [counter]);

	const getColor = (id) => {
		return colorSet ? colorSet[id] : BLACK;
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
				{[...Array(length)].map((_, ind) => {
					const id = createId(ind, position,width, height);
					return (
						<Source
							color={getColor(id)}
							id={id}
							className={sourceClassName}
							key={ind}
							onClick={() => onClickSource(id)}
						/>
					);
				}
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