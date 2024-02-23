const StyleDictionary = require('style-dictionary-utils');
const Color = require('colorjs.io').default;


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
	VisitedText: 'purple'
};

const matcher = token => {
	return token?.$type === 'color' || token?.type === 'color';
}
const transformer = (token) => {
	const tokenColor = token.$value || token.value;
	const color = new Color(systemColorTranslation[tokenColor] || tokenColor);
	return color.toString({format: "hex"});
}

StyleDictionary.registerTransform({
	name: "system/colors",
	type: `value`,
	transitive: true,
	matcher,
	transformer
})


module.exports = {transformer, matcher};

