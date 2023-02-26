import React from 'react';
import ColorBox from './ColorBox';
import { string } from 'prop-types';
import { ColorBoxType } from 'constants/constants';

const Source = (props) => {
	return <ColorBox
		{...props}
		type={ColorBoxType.SOURCE} />;
};

Source.propTypes = {
	color: string,
};

export default Source;