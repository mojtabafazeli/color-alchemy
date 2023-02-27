import './Sources.scss';
import React, { useState, useCallback } from 'react';
import { string, number, func } from 'prop-types';
import noop from 'lodash/noop';
import classNames from 'classnames';
import Source from 'components/ColorBox/Source';
import { useColorState, useColorUpdater } from 'context/ColorContext';
import { BLACK, RED, GREEN, BLUE } from 'constants/colorConstants';
import getColor from 'utils/color/getColor';

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
		updateColorSet(prev => ({ ...prev, [id]: setPrimaryColor(counter) }));
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
					const id = createId(ind, position, width, height);
					const color = getColor(colorSet, id);
					const tooltip = color && color.slice(4, color?.length - 1);
					return (
						<Source
							color={color}
							id={id}
							className={sourceClassName}
							key={id}
							onClick={() => onClickSource(id)}
							tooltip={tooltip}
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

function createId (ind, position, width, height) {
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
}

function setPrimaryColor (counter) {
	switch (counter) {
	case 3: return RED;
	case 2: return GREEN;
	case 1: return BLUE;
	default: return BLACK;
	}
}