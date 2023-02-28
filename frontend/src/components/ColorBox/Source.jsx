import React from 'react';
import { string } from 'prop-types';
import ColorBox from './ColorBox';
import { ColorBoxType } from 'constants/constants';

const Source = (props) => {
	const onDrop = (data, ev) => {
	};
	return (
		<ColorBox
			{...props}
			type={ColorBoxType.SOURCE}
		/>
	);
};

Source.propTypes = {
	color: string,
};

export default Source;