/**
 * getLayerName
 * @param {Object<CSSRule>} rule
 * @returns {string}
 */

export function getLayerName(rule) {
    return rule?.name || rule?.layerName || '';
}
