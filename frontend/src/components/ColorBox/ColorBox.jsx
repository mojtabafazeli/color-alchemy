import './ColorBox.scss';
import React from 'react';
import noop from 'lodash/noop';
import classNames from 'classnames';
import { string, oneOf, func } from 'prop-types';
import { ColorBoxType } from 'constants/constants';
import { BLACK } from 'constants/colorConstants';

const ColorBox = ({
	color = BLACK,
	id: propId,
	className: propClassName,
	type,
	onClick = noop,
	tooltip,
}) => {   
	const boxClassName = classNames('box', type, propClassName);
	return (
		<div className='ColorBox'>
			<div
				id={propId}
				className={boxClassName}
				style={{ backgroundColor: color }}
				onClick={onClick}
			/>
			
			<div className='tooltip'>
				<span className='tooltipText'>{tooltip}</span>
			</div>
		</div>
	);
};

ColorBox.propTypes = {
	color: string,
	type: oneOf([ColorBoxType.TILE, ColorBoxType.SOURCE]),
	id: string,
	className: string,
	onClick: func,
	tooltip: string,
};

export default ColorBox;

