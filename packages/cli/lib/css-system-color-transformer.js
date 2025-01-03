import Color from 'colorjs.io';

/**
 * A mapping of system color names to their string representation in the format of CSS color values.
 * The object contains key-value pairs where the key represents a system-defined color role
 * and the value represents the corresponding color value.
 *
 * Properties:
 * - AccentColor: Represents the accent or emphasized color in the system (e.g., 'lightBlue').
 * - AccentColorText: Represents the text color used on accent-colored backgrounds (e.g., 'darkblue').
 * - ActiveText: The color of text on elements that are actively engaged (e.g., 'crimson').
 * - ButtonBorder: The color of the borders of buttons (e.g., 'black').
 * - ButtonFace: The background color of buttons (e.g., 'white').
 * - ButtonText: The color of text on buttons (e.g., 'black').
 * - Canvas: The background color of the main content regions (e.g., 'white').
 * - CanvasText: The color of text in content regions (e.g., 'black').
 * - Field: The background color of input fields, such as text boxes (e.g., 'black').
 * - FieldText: The color of text in input fields (e.g., 'black').
 * - GrayText: The color of text that is displayed in a grayed-out or disabled state (e.g., 'Gray').
 * - Highlight: The background color of selected or focused items (e.g., 'steelblue').
 * - HighlightText: The text color for highlight-colored backgrounds (e.g., 'black').
 * - LinkText: The color of hyperlinks (e.g., 'dodgerblue').
 * - Mark: The background color of marked or highlighted text (e.g., 'yellow').
 * - MarkText: The text color for marked or highlighted areas (e.g., 'black').
 * - SelectedItem: The background color for selected items in a list or dropdown menu (e.g., 'lightBlue').
 * - SelectedItemText: The text color for selected items (e.g., 'black').
 * - VisitedText: The color of links that have already been visited (e.g., 'purple').
 * @type {Record<string,string>}
 */
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
/**
 * @param {import('style-dictionary').Token} token
 * @return {*}
 */
export const isColor = token => {
	return token?.$type === 'color';
};
/**
 * @param {import('style-dictionary').Token} token
 * @return {*}
 */
export const transformColor = token => {
	const color = new Color(systemColorTranslation[token.$value] || token.$value);
	return color.toString({ format: 'hex' });
};

export default {
	name: 'system/colors',
	type: `value`,
	transitive: true,
	filter: isColor,
	transform: transformColor,
};
