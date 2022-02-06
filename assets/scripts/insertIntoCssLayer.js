import { hasCSSLayerSupport } from './hasCSSLayerSupport.js';
export const insertIntoCssLayer = (sheets, layer) => {
	if (hasCSSLayerSupport()) {
		sheets.forEach((sheet) => {
			let cssText = [...sheet.cssRules].reduce((acc, rule) => (acc += rule.cssText), '');
			sheet.replace(`
			@layer ${layer} {
				${cssText}
			}`);
		});
	}
}
