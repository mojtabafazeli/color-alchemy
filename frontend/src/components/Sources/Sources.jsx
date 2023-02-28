import './Sources.scss';
import 'react-confirm-alert/src/react-confirm-alert.css';
import React, { useState, useCallback } from 'react';
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
import { RED, GREEN, BLUE, BLACK, INITIAL_DELTA } from 'constants/colorConstants';

const Sources = (
	{
		width,
		height,
		setMovesLeft= noop,
	}
) => {
	const [counter, setCounter] = useState(3);
	const [delta, setDelta] = useState(INITIAL_DELTA);
	const [closestColor, setClosestColor] = useState(BLACK);
	const [closestId, setClosestId] = useState(BLACK);
	const { tilesColorsSet, sourcesColorsSet } = useColorState();
	const { updateTilesColorsSet, updateSourcesColorsSet, resetColorSet } = useColorUpdater();
	const { fetchedGameState: gameState, movesLeft } = useGameState();
	const { resetGame } = useGameUpdater();
	if (movesLeft === 0) {
		confirmAlert({
			title: 'Your score is 100',
			message: 'Do you want to play again?',
			onClickOutside: null,
			buttons: [
				{
					label: 'Yes',
					onClick: () => {
						setCounter(3);
						setMovesLeft(20);
						resetGame(gameState.userId);
						resetColorSet();
					}
				},
				{
					label: 'No',
					onClick: () => {
						setMovesLeft(null);
						resetColorSet();
					}
				}
			],
			onCancel: null, 
			overlayClassName: 'overlay-custom-class-name'
		});
	}

	const findClosestColor = useCallback(() => {
		const tilesColorsArray = tilesColorsSet && Object.entries(tilesColorsSet);
		const { target } = gameState;
		tilesColorsArray?.forEach(([id, c]) => {
			if (c === 'rgb(0,0,0)') return;
			let currDelta = INITIAL_DELTA;
			let currClosest = '';
			let currId = '';
			const d = calcDelta(c, target);
			if (d <= currDelta) {
				currDelta = d ;
				currClosest = c;
				currId = id;
			}
			setDelta(currDelta);
			setClosestColor(currClosest);
			setClosestId(currId);
		});
	}, [gameState, tilesColorsSet]);
	
	const onClickSource = (sourceId) => {
		if (counter === 0 || [RED, GREEN, BLUE].includes(sourcesColorsSet?.[sourceId])
		) return;
		console.log('color is ', sourcesColorsSet?.[sourceId]);
		setMovesLeft(prev => {
			return prev - 1;
		});
		setCounter(prev => prev - 1);
		const sourceColor = setPrimaryColor(counter);
		const tilesSet = updateTilesColors(sourceId, sourceColor, tilesColorsSet, width, height);
		findClosestColor();
		updateTilesColorsSet(prev => ({ ...prev,...tilesSet}));
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
