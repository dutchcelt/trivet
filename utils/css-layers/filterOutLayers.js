/**
 * filterOutLayers
 * @param {CSSRuleList} ruleList
 * @returns {Array}
 */
export function filterOutLayers(ruleList) {
	return [...ruleList].filter((rule) =>
		/CSSLayerBlockRule|CSSImportRule/.test(rule.constructor.name)
	);
}
