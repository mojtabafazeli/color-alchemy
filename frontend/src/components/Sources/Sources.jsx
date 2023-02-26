import './Sources.scss';
import React, { useState } from 'react';
import { string, number, func } from 'prop-types';
import noop from 'lodash/noop';
import classNames from 'classnames';
import Source from 'components/ColorBox/Source';

const Sources = (
	{
		width,
		height,
		setMovesLeft= noop,
	}
) => {
	const [counter, setCounter] = useState(3);

	const onClickSource = (ind, position) => {
		if (counter === 0) return;
		setMovesLeft(prev => {
			if (prev < 0) return;
			return prev-1;
		});
		setCounter(prev => prev - 1);
	};

	const SourcesRow = (
		{
			length,
			position,
		}
	) => {
		const ulClassName = classNames('Sources sources', position);
		const sourceClassName = classNames({
			'pointer': !!counter,
			'non-pointer': !counter
		});
		return (
			<ul className={ulClassName}>
				{[...Array(length)].map((_, ind) => (
					<Source
						id={`${ind + 1}-${position}`}
						className={sourceClassName}
						key={ind}
						onClick={() => onClickSource(ind, position)}
					/>
				)
				)}
			</ul>
		);
	};

	SourcesRow.propTypes = {
		length: number,
		position: string,
	};

	return (
		<>
			<SourcesRow length={width} position='top' />
			<SourcesRow length={height} position='left' />
			<SourcesRow length={height} position='right' />
			<SourcesRow length={width} position='bottom' />
		</>
	);
};

Sources.propTypes = {
	width: number,
	height: number,
	setMovesLeft: func,
};

export default Sources;