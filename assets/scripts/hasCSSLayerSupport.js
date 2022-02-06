export const hasCSSLayerSupport = () => {
	const stylesheet = new CSSStyleSheet();
	const layer = 'test';
	const rule = `@layer ${layer} { 
		:host { color: inherit }
	}`;
	try {
		stylesheet.insertRule(rule, 0);
		return true;
	} catch (e) {
		console.warn('Does not have layers');
		return false;
	}
}

