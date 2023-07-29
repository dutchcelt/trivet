/**
 * @typedef {import('./cssstylesheet.d').CSSStyleSheet} styleDef
 */
/**
 * getLayerName
 * @param {styleDef} rule
 * @returns {string}
 */

export function getLayerName(rule) {
	return rule?.name || rule?.layerName || '';
}
