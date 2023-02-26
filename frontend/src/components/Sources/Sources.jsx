import React from 'react';
import { string, number } from 'prop-types';
import classNames from 'classnames';
import Source from 'components/ColorBox/Source';

const Sources = ({
	length,
	position,
	direction
}) => {
	const ulClassName = classNames('sources', position, direction);
	return (
		<ul className={ulClassName}>
			{[...Array(length)].map((_, ind) => <Source id={`${ind+1}-${position}` } key={ind} />)}
		</ul>
	);
};

Sources.propTypes = {
	length: number,
	position: string,
	direction: string,

};

export default Sources;