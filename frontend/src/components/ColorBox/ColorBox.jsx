import './ColorBox.scss';
import React from 'react';
import noop from 'lodash/noop';
import classNames from 'classnames';
import { string, oneOf, func, object } from 'prop-types';
import { ColorBoxType } from 'constants/constants';
import { BLACK } from 'constants/colorConstants';
import { Draggable, Droppable } from 'react-drag-and-drop';

const ColorBox = ({
	color = BLACK,
	className: propClassName,
	type,
	onClick = noop,
	tooltip,
	...rest
}) => {   
	const boxClassName = classNames('box', type, propClassName);
	const onDrop = (data) => {
		console.log(data);
	};
	return (
		<div className='ColorBox'>
			{
				type === ColorBoxType.TILE ?
					<Draggable type='color' data={color}>
						<div
							className={boxClassName}
							style={{ backgroundColor: color }}
							onClick={onClick}
							{...rest}
						/>
					</Draggable>
					: (
						<Droppable types={['color']} onDrop={onDrop}>
							<div
								className={boxClassName}
								style={{ backgroundColor: color }}
								onClick={onClick}
								{...rest}
							/>
						</Droppable>
					)
			}
			
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

