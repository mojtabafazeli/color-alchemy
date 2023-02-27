import { BLACK } from 'constants/colorConstants';

const getColor = (colorSet, id) => {
	return colorSet ? colorSet[id] : BLACK;
};

export default getColor;