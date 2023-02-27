import { BLACK, RED, GREEN, BLUE } from 'constants/colorConstants';

const setPrimaryColor = (counter) => {
	switch (counter) {
	case 3: return RED;
	case 2: return GREEN;
	case 1: return BLUE;
	default: return BLACK;
	}
};

export default setPrimaryColor;