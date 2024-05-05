import { sheetRule } from './sheetRule.js';

/**
 * getAllCssRules
 * @param {CSSStyleSheet} sheet - This is either a stylesheet or a rule
 * @returns {Array<CSSStyleSheet>}
 */

export function getAllCssRules(sheet) {
	/** @type {CSSStyleSheet[]} */
	const collection = [];
	if (sheet) {
		(function _flatten(o) {
			// @ts-expect-error
			const rules = sheetRule(o)?.cssRules || [];

			[...rules].forEach(
				/** @param {any} k */
				k => {
					collection.push(k);
					// @ts-expect-error
					const hasRules = !!sheetRule(k)?.cssRules;
					// @ts-expect-error
					hasRules && _flatten(sheetRule(k));
				},
			);
		})(sheet);
	}
	return collection;
}
