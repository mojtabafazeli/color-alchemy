import './ColorBox.scss';
import React from 'react';
import noop from 'lodash/noop';
import classNames from 'classnames';
import { string, oneOf, func, object } from 'prop-types';
import { ColorBoxType } from 'constants/constants';
import { BLACK } from 'constants/colorConstants';

const ColorBox = ({
	color = BLACK,
	className: propClassName,
	type,
	onClick = noop,
	tooltip,
	...rest
}) => {   
	console.log('rest', rest);
	const boxClassName = classNames('box', type, propClassName);
	return (
		<div className='ColorBox'>
			<div
				className={boxClassName}
				style={{ backgroundColor: color }}
				onClick={onClick}
				{...rest}
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
	className: string,
	onClick: func,
	tooltip: string,
	props: object,
};

export default ColorBox;

