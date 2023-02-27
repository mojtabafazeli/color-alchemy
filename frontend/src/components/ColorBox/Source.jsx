import React from 'react';
import ColorBox from './ColorBox';
import { string } from 'prop-types';
import { ColorBoxType } from 'constants/constants';

const Source = (props) => {
	const onDragOver = (ev) => ev.preventDefault();
	const onDrop = (e) => {
		const color = e.dataTransfer.getData('color');
		console.log(color);
	};
	return (
		<ColorBox
			{...props}
			type={ColorBoxType.SOURCE}
			onDragOver={(e) => onDragOver(e)}
			onDrop = {(e) => onDrop(e)}
		/>
	);
};

Source.propTypes = {
	color: string,
};

export default Source;