/**
 * @param {{ styleSheet: any; }} rule
 * @returns {StyleSheet | CSSStyleSheet}
 */
export function sheetRule(rule) {
	return rule?.styleSheet || rule;
}
