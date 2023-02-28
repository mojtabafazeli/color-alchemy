import calcCompoundRGB from 'utils/color/calcCompoundRGB';
import getColor from 'utils/color/getColor';

function updateTilesColors (sourceId, sourceColor, colorSet, width, height) {
	const set = {};
	const idArr = sourceId.split('-');
	const xPos = idArr[0];
	const yPos = idArr[1];

	if (yPos == 0) {
		console.log('1');
		for (let i = 1; i < height; i++) {
			const id = `${xPos}-${height - i}`;
			const tileColor = getColor(colorSet, id);
			const color = calcCompoundRGB(tileColor, sourceColor, i, height);
			set[id] = color;
		}
	} else if (xPos == 0) { 
		console.log('2');
		for (let i = 1; i < width ; i++) {
			const id = `${width-i}-${yPos}`;
			const tileColor = getColor(colorSet, id);
			const color = calcCompoundRGB(tileColor, sourceColor, i, width);
			set[id] = color;
		}
	}
	if (yPos == height + 1) {
		console.log('3');
		for (let i = height; i >= 1; i--) {
			const id = `${xPos}-${i}`;
			const tileColor = getColor(colorSet, id);
			console.log(tileColor, id);
			const color = calcCompoundRGB(tileColor, sourceColor, i, height);
			set[id] = color;
		}
	} else if (xPos == width + 1) { 
		for (let i = width; i >= 1; i--) {
			const id = `${i}-${yPos}`;
			console.log('4', id);
			const tileColor = getColor(colorSet, id);
			const color = calcCompoundRGB(tileColor, sourceColor, i, width);
			set[id] = color;
		}
	}
	console.log(set);
	return set;
}

export default updateTilesColors;