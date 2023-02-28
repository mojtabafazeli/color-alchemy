import { BLACK } from 'constants/colorConstants';

const getColor = (colorSet, id) => {
	return colorSet?.[id] ? colorSet[id] : BLACK;
};

export default getColor;