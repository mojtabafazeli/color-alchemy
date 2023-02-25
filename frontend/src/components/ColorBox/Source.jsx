import React from 'react';
import ColorBox from './ColorBox';
import { string } from 'prop-types';
import { ColorBoxType } from 'constants/constants';

const Source = ({ color }) => {
	return <ColorBox color={color} type={ColorBoxType.SOURCE} />;
};

Source.propTypes = {
	color: string,
};

export default Source;