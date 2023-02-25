import React from 'react';
import { string } from 'prop-types';
import ColorBox from './ColorBox';
import { ColorBoxType } from 'constants/constants';


const Tile = ({ color }) => {
    return <ColorBox color={color} type={ColorBoxType.TILE}/> 
}

Tile.propTypes = {
    color: string,
}

export default Tile;