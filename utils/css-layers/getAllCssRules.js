import { sheetRule } from './sheetRule.js';

/**
 * getAllCssRules
 * @param {CSSStyleSheet|CSSRule} sheet - This is either a stylesheet or a rule
 * @returns {Array}
 */

export function getAllCssRules(sheet) {
	const collection = [];
	if (sheet) {
		(function _flatten(o) {
			const rules = sheetRule(o)?.cssRules || [];
			[...rules].forEach((k) => {
				collection.push(k);
				const hasRules = !!sheetRule(k)?.cssRules;
				hasRules && _flatten(sheetRule(k));
			});
		})(sheet);
	}
	return collection;
}
