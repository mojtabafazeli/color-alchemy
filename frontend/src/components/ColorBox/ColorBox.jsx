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
	id,
	type,
	onDrop: propOnDrop = noop,
	onClick = noop,
	tooltip,
	...rest
}) => {   
	const boxClassName = classNames('box', type, propClassName);
	const onDrop = (data) => {
		propOnDrop(data, id);
	};
	
	return (
		<div className='ColorBox'>
			{
				type === ColorBoxType.TILE ?
					<Draggable type={'color'} data={[color]}>
						<div
							className={boxClassName}
							style={{ backgroundColor: color }}
							id={id}
							onClick={onClick}
							{...rest}
						/>
					</Draggable>
					: (
						<Droppable types={'color'} onDrop={onDrop}>
							<div
								className={boxClassName}
								style={{ backgroundColor: color }}
								onClick={onClick}
								{...rest}
							/>
						</Droppable>
					)
			}
			
			{ !!tooltip &&
				<div className='tooltip'>
					<span className='tooltipText'>{tooltip}</span>
				</div>
			}
		</div>
	);
};

ColorBox.propTypes = {
	color: string,
	id: string,
	type: oneOf([ColorBoxType.TILE, ColorBoxType.SOURCE]),
	className: string,
	onDrop: func,
	onClick: func,
	tooltip: string,
	props: object,
};

export default ColorBox;

