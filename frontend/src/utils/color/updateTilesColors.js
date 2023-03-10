import calcCompoundRGB from 'utils/color/calcCompoundRGB';
import getColor from 'utils/color/getColor';

function updateTilesColors (sourceId, sourceColor, colorSet, width, height) {
	const set = {};
	const idArr = sourceId.split('-');
	const xPos = idArr[0];
	const yPos = idArr[1];

	if (yPos == 0) {
		for (let i = 1; i < height; i++) {
			const id = `${xPos}-${height - i}`;
			const tileColor = getColor(colorSet, id);
			const color = calcCompoundRGB(tileColor, sourceColor, i, height);
			set[id] = color;
		}
	} else if (xPos == 0) { 
		for (let i = 1; i < width ; i++) {
			const id = `${width-i}-${yPos}`;
			const tileColor = getColor(colorSet, id);
			const color = calcCompoundRGB(tileColor, sourceColor, i, width);
			set[id] = color;
		}
	}
	if (yPos == height + 1) {
		for (let i = height; i >= 1; i--) {
			const id = `${xPos}-${i}`;
			const tileColor = getColor(colorSet, id);
			const color = calcCompoundRGB(tileColor, sourceColor, i, height);
			set[id] = color;
		}
	} else if (xPos == width + 1) { 
		for (let i = width; i >= 1; i--) {
			const id = `${i}-${yPos}`;
			const tileColor = getColor(colorSet, id);
			const color = calcCompoundRGB(tileColor, sourceColor, i, width);
			set[id] = color;
		}
	}
	return set;
}

export default updateTilesColors;