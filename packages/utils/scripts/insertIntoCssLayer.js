import { hasCSSLayerSupport } from './hasCSSLayerSupport.js';

/**
 * Inserts CSS rules into a specific layer of the given style sheets.
 *
 * @param {CSSStyleSheet[]} sheets - The style sheets to insert the CSS rules into.
 * @param {string} layer - The layer name to insert the CSS rules into.
 * @returns {void}
 */
export const insertIntoCssLayer = (sheets, layer) => {
	if (hasCSSLayerSupport()) {
		return sheets.forEach(sheet => {
			let cssText = [...sheet.cssRules].reduce(
				(acc, rule) => (acc += rule.cssText),
				'',
			);
			sheet.replace(`
			@layer ${layer} {
				${cssText}
			}`);
		});
	}
};
