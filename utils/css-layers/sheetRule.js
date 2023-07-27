/**
 * sheetRule
 * @param {CSSRule|CSSStyleSheet} rule
 * @returns {CSSRule}
 */
export function sheetRule(rule) {
    return rule?.styleSheet || rule;
}
