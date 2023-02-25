import './GameInfoBox.scss';
import React from 'react';
import {string } from 'prop-types';
import Tile from 'components/ColorBox/Tile';
import Source from 'components/ColorBox/Source';

const GameInfoBox = ({
	userId,
	targetColor,
	closestColor,
	delta,
}) => {
	return (
		<div className='GameInfoBox'>
			<h5>RGB Alchemy</h5>
            
			<p>User ID: {userId}</p>
            
			<div className='colorLine'>
				<span>Target color</span>
                
				<Tile color={targetColor} />
			</div>
            
			<div className='colorLine'>
				<span>Target color</span>
                
				<Source color={closestColor} />
                
				<span>△ = {delta}</span>
			</div>
		</div>
	);
};

GameInfoBox.propTypes = {
	userId: string,
	targetColor: string,
	closestColor: string,
	delta: string,
};

export default GameInfoBox;