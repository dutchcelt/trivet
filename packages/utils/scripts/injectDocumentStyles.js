/**
 * Injects an array of CSS stylesheets into the current document.
 *
 * @param {string[]} styleSheetArray - An array of CSS stylesheets to inject into the document.
 * @param {string} [tag='unknown'] - An optional tag to identify the injected stylesheets.
 * @returns {void}
 */
const injectDocumentStyles = (styleSheetArray, tag = 'unknown') => {
	styleSheetArray.forEach(async styles => {
		let styleSheet;
		try {
			styleSheet = new CSSStyleSheet();
			await styleSheet.replace(styles);
			document.adoptedStyleSheets.includes(styleSheet) ||
				document.adoptedStyleSheets.push(styleSheet);
		} catch (err) {
			// This method is slower, but works in all browsers.
			styleSheet = document.createElement('style');
			styleSheet.id = `${tag}`;
			styleSheet.textContent = styles;
			document.head.appendChild(styleSheet);
		}
	});
};
export { injectDocumentStyles };
