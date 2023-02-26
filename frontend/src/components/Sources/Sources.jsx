import React from 'react';
import { string, number } from 'prop-types';
import classNames from 'classnames';
import Source from 'components/ColorBox/Source';

const Sources = ({
	length,
	position,
}) => {
	const ulClassName = classNames('sources', position);
	
	const onClickSource = (ind, position) => {
		// setMoves(prev => {
		// 	if (prev === 0) return;
		// 	return prev-1;
		// });
		console.log(ind + 1, position);
	};

	return (
		<ul className={ulClassName}>
			{[...Array(length)].map((_, ind) => (
				<Source
					id={`${ind + 1}-${position}`}
					key={ind}
					onClick={() => onClickSource(ind, position)}
				/>
			)
			)}
		</ul>
	);
};

Sources.propTypes = {
	length: number,
	position: string,
};

export default Sources;