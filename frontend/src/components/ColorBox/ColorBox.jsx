import './ColorBox.scss';
import React from 'react';
import noop from 'lodash/noop';
import classNames from 'classnames';
import { string, oneOf, func } from 'prop-types';
import { ColorBoxType } from 'constants/constants';

const ColorBox = ({
	color = 'rgb(0,0,0)',
	id: propId,
	type,
	onClick = noop,
}) => {   
	const boxClassName = classNames('box', type);
	return (
		<div className='ColorBox'>
			<div
				id={propId}
				className={boxClassName}
				style={{ backgroundColor: color }}
				onClick={onClick}
			>
			</div>
		</div>
	);
};

ColorBox.propTypes = {
	color: string,
	type: oneOf([ColorBoxType.TILE, ColorBoxType.SOURCE]),
	id: string,
	onClick: func,
};

export default ColorBox;

