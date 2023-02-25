import './ColorBox.scss';
import React from 'react';
import classNames from 'classnames';
import { string, oneOf } from 'prop-types';
import { ColorBoxType } from 'constants/constants';

const ColorBox = ({
	color,
	type,
}) => {   
	const boxClassName = classNames('box', type);
	return (
		<div className='ColorBox'>
			<div
				className={boxClassName}
				style={{ backgroundColor: color  }}    
			>
			</div>
		</div>
	);
};

ColorBox.defaultProps = {
	color: 'black',
};

ColorBox.propTypes = {
	color: string,
	type: oneOf([ColorBoxType.TILE, ColorBoxType.SOURCE])
};

export default ColorBox;

