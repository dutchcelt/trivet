/**
 * @typedef {import('./cssstylesheet.d').CSSStyleSheet} styleDef
 */

/**
 * sheetRule
 * @param {styleDef} rule
 * @returns {styleDef}
 */
export function sheetRule(rule) {
	const returnobj = rule?.styleSheet || rule;
	return returnobj;
}
