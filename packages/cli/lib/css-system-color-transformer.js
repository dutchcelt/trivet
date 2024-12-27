// @ts-nocheck
import Color from 'colorjs.io';

const systemColorTranslation = {
	AccentColor: 'lightBlue',
	AccentColorText: 'darkblue',
	ActiveText: 'crimson',
	ButtonBorder: 'black',
	ButtonFace: 'white',
	ButtonText: 'black',
	Canvas: 'white',
	CanvasText: 'black',
	Field: 'black',
	FieldText: 'black',
	GrayText: 'Gray',
	Highlight: 'steelblue',
	HighlightText: 'black',
	LinkText: 'dodgerblue',
	Mark: 'yellow',
	MarkText: 'black',
	SelectedItem: 'lightBlue',
	SelectedItemText: 'black',
	VisitedText: 'purple',
};

const isColor = token => {
	return token?.$type === 'color' || token?.type === 'color';
};
const transformColor = token => {
	const tokenColor = token.$value || token.value;
	const color = new Color(systemColorTranslation[tokenColor] || tokenColor);
	return color.toString({ format: 'hex' });
};

export default {
	name: 'system/colors',
	type: `value`,
	transitive: true,
	filter: isColor,
	transform: transformColor,
};
