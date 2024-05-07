/**
 * isLayer
 * @param {CSSRule} rule
 * @returns {boolean}
 */
export function isLayer(rule) {
	return /CSSLayerBlockRule|CSSImportRule/.test(rule.constructor.name);
}
