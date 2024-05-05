/**
 * Filters out layers from the given rule list.
 *
 * @param {CSSRuleList} ruleList - The list of rules to filter.
 * @returns {CSSRuleList} - The filtered rule list containing only CSSLayerBlockRule and CSSImportRule instances.
 */
export function filterOutLayers(ruleList) {
	// @ts-ignore
	return [...ruleList].filter(rule =>
		/CSSLayerBlockRule|CSSImportRule/.test(rule.constructor.name),
	);
}
