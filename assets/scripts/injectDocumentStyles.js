const injectDocumentStyles = (styleSheetArray, tag = 'unknown') => {
	styleSheetArray.forEach(async styles => {
		let styleSheet;
		try {
			styleSheet = new CSSStyleSheet();
			await styleSheet.replace(styles);
			document.adoptedStyleSheets = styleSheet;
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
