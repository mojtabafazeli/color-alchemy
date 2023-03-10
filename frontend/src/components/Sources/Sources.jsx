import './Sources.scss';
import 'react-confirm-alert/src/react-confirm-alert.css';
import React, { useState } from 'react';
import { string, number, func } from 'prop-types';
import noop from 'lodash/noop';
import { confirmAlert } from 'react-confirm-alert';
import classNames from 'classnames';
import Source from 'components/ColorBox/Source';
import { useColorState, useColorUpdater } from 'context/ColorContext';
import getColor from 'utils/color/getColor';
import setPrimaryColor from 'utils/color/setPrimaryColor';
import updateTilesColors from 'utils/color/updateTilesColors';
import getRGBString from 'utils/color/getRGBString';
import { useGameState, useGameUpdater } from 'context/GameContext';
import calcDelta from 'utils/color/calcDelta';
import { RED, GREEN, BLUE } from 'constants/colorConstants';
import { MAX_SOURCE_CLICK, SUCCESS_SCORE } from 'constants/constants';

const Sources = (
	{
		width,
		height,
		setMovesLeft= noop,
	}
) => {
	const [counter, setCounter] = useState(MAX_SOURCE_CLICK );
	
	const { tilesColorsSet, sourcesColorsSet, delta, closestId } = useColorState();
	const { updateTilesColorsSet, updateSourcesColorsSet, setDelta, setClosestId, resetColorSet } = useColorUpdater();
	const { fetchedGameState: gameState, movesLeft } = useGameState();
	const { resetGame } = useGameUpdater();
	let result = 'Failed';
	if (movesLeft === 0 || delta < SUCCESS_SCORE) {
		if (delta < SUCCESS_SCORE) result = 'Success';
		confirmAlert({
			title: result,
			message: 'Do you want to play again?',
			onClickOutside: null,
			buttons: [
				{
					label: 'Yes',
					onClick: () => {
						setDelta(delta);
						setCounter(MAX_SOURCE_CLICK);
						resetGame(gameState.userId);
						resetColorSet();
					}
				},
				{
					label: 'No',
					onClick: () => {
						setCounter(0);
						setMovesLeft(0);
					}
				}
			],
			onCancel: null, 
			overlayClassName: 'overlay-custom-class-name'
		});
	}

	const findClosestColor = () => {
		const tilesColorsArray = tilesColorsSet && Object.entries(tilesColorsSet);
		const { target } = gameState;
		tilesColorsArray?.forEach(([id, c]) => {
			const d = calcDelta(c, target);
			if (d <= delta) {
				setDelta(d);
				setClosestId(id);
			}
		});
	};

	const onClickSource = (sourceId) => {
		if (counter === 0 || [RED, GREEN, BLUE].includes(sourcesColorsSet?.[sourceId])
		) return;
		setMovesLeft(prev => {
			return prev - 1;
		});
		setCounter(prev => prev - 1);
		const sourceColor = setPrimaryColor(counter);
		const tilesSet = updateTilesColors(sourceId, sourceColor, tilesColorsSet, width, height);
		updateTilesColorsSet(prev => ({ ...prev,...tilesSet}));
		findClosestColor();
		updateSourcesColorsSet(prev => ({ ...prev, [sourceId]: sourceColor }));
	};

	const onDrop = (color, sourceId) => {
		if (movesLeft === null) return;
		setMovesLeft(prev => {
			return prev - 1;
		});
		const sourceColor = color.color;
		const tilesSet = updateTilesColors(sourceId, sourceColor, tilesColorsSet, width, height);
		findClosestColor();
		updateTilesColorsSet(prev => ({ ...prev,...tilesSet}));
		updateSourcesColorsSet(prev => ({ ...prev, [sourceId]: sourceColor }));
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
					const color = getColor(sourcesColorsSet, id);
					const tooltip = getRGBString(color);
					return (
						<Source
							color={color}
							id={id}
							className={sourceClassName}
							key={id}
							onDrop={onDrop}
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
