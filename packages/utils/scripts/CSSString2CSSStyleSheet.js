/**
 * Convert a CSS String (CSSText) to a stylesheet.
 * This enables the use of constructed stylesheets
 * @param {string} css
 * @returns {CSSStyleSheet|null}
 * @constructor
 */
export const CSSString2CSSStyleSheet = css => {
	const style = document.createElement('style');
	style.innerText = css;
	document.head.appendChild(style);
	const { sheet } = style;
	document.head.removeChild(style);
	return sheet;
};
