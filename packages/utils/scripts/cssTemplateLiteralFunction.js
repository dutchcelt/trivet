/**
 * Creates a CSSStyleSheet object with the provided CSS strings and expressions.
 *
 * @param {Array<string>} strings - An array of CSS strings.
 * @param {...*} expressions - Optional expressions to be interpolated within the CSS strings.
 *
 * @returns {CSSStyleSheet} A CSSStyleSheet object with the applied CSS.
 */
const css = (strings, ...expressions) => {
	const sheet = new CSSStyleSheet();
	sheet.replaceSync(String.raw({ raw: strings }, ...expressions));
	return sheet;
};

export { css };
