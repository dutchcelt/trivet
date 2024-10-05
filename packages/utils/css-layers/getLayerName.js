/**
 * getLayerName
 * @param {CSSStyleSheet} rule
 * @returns {string}
 */
export function getLayerName(rule) {
	// @ts-expect-error
	return rule?.name || rule?.layerName || '';
}
