const createSheet = (rules) => {
	const sheet = new CSSStyleSheet();
	sheet.replaceSync(rules);
	return sheet;
};
const getSheet = (styles) => {
	const isStyleSheet = typeof styles === 'object' && !!styles.cssRules;
	return isStyleSheet ? styles : createSheet(styles);
};

const adoptStyles = (shadowRoot, styles) => {
	const sheets = styles.map((s) => getSheet(s));
	shadowRoot.adoptedStyleSheets = sheets;
};
export { adoptStyles };
