import './GameInfoBox.scss';
import React from 'react';
import { string, number, array } from 'prop-types';
import Tile from 'components/ColorBox/Tile';
import {USER_ID, MOVES_LEFT, TARGET_COLOR, CLOSEST_COLOR } from 'constants/langConstants';

const GameInfoBox = ({
	userId,
	targetColor,
	closestColor,
	target,
	movesLeft,
	delta,
}) => {
	return (
		<div className='GameInfoBox'>
			<h5>RGB Alchemy</h5>
            
			<p>{USER_ID}: {userId}</p>

			<p>{MOVES_LEFT}: {movesLeft}</p>
            
			<div className='colorLine'>
				<span>{TARGET_COLOR}</span>
                
				<Tile color={targetColor} tooltip={target?.join(', ')} />
			</div>
            
			<div className='colorLine'>
				<span>{CLOSEST_COLOR}</span>
                
				<Tile color={closestColor} tooltip={closestColor?.join(', ')}/>
                
				<span>△ = {delta}</span>
			</div>
		</div>
	);
};

GameInfoBox.propTypes = {
	userId: string,
	targetColor: string,
	closestColor: string,
	target: array,
	movesLeft: number,
	delta: string,
};

export default GameInfoBox;