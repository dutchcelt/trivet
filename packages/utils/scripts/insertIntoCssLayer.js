import { hasCSSLayerSupport } from './hasCSSLayerSupport.js';

/**
 * External stylesheet often to not a layers. This allows us wrap that sheet in at-rule layer.
 * @param sheets
 * @param layer
 */
export const insertIntoCssLayer = (sheets, layer) => {
	if (hasCSSLayerSupport()) {
		return sheets.forEach(sheet => {
			let cssText = [...sheet.cssRules].reduce(
				(acc, rule) => (acc += rule.cssText),
				''
			);
			sheet.replace(`
			@layer ${layer} {
				${cssText}
			}`);
		});
	}
};
