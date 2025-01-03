/**
 * @license EUPL-1.2
 * Copyright (c) 2021 Robbert Broersma
 *
 * Original reference:
 * https://github.com/nl-design-system/utrecht/blob/main/proprietary/design-tokens/src/css-property-formatter.js
 *
 * Mofified to allow stand-a-lone usage
 * Copyright (c) 2023 Egor Kloos
 */

import defaults from './defaults.js';
const { cssPropExtension } = defaults;

/**
 * stringSort
 * @param {string} a
 * @param {string} b
 */
const stringSort = (a, b) => (a === b ? 0 : a > b ? 1 : -1);

/**
 * The CSSPropertyRule interface.
 * @typedef {Object} CSSPropertyRule
 * @property {String} name
 * @property {String} syntax
 * @property {Boolean} inherits
 * @property {String} initialValue
 */

/**
 * getExtension
 * @param {import('style-dictionary').Token} token
 * @returns {CSSPropertyRule}
 */
const getExtension = token => token['$extensions'][cssPropExtension];

/**
 * hasExtension
 * @param {import('style-dictionary').Token} token
 * @returns {boolean}
 */
const hasExtension = token => {
	const extScope = token['$extensions']?.[cssPropExtension];
	return typeof extScope?.inherits === 'boolean';
};

import { transformColor, isColor } from './css-system-color-transformer.js';

/**
 * @param {import('style-dictionary').Token} token
 * @return {*}
 */
const convertHelper = token => {
	return isColor(token) ? transformColor(token) : token.$value;
};

/**
 * Format object for Style Dictionary
 * @type {Object}
 */
export default {
	name: 'css/property',
	/** @param {{dictionary: import('style-dictionary').Dictionary, options: any}} args
	 * @returns
	 */
	format: function ({ dictionary, options }) {
		const linebreak = options.minify ? '' : '\n';
		const { allTokens } = dictionary;
		// https://drafts.css-houdini.org/css-properties-values-api/#the-css-property-rule-interface
		return allTokens
			.sort(
				(
					/** @type{import('style-dictionary').TransformedToken} */ tokenA,
					/** @type{import('style-dictionary').TransformedToken} */ tokenB,
				) => stringSort(tokenA.name, tokenB.name),
			)
			.filter(
				(/** @type{import('style-dictionary').TransformedToken} */ token) =>
					hasExtension(token),
			)
			.map(
				(/** @type{import('style-dictionary').TransformedToken} */ token) => {
					/** @type {CSSPropertyRule} cssProp*/
					const cssProp = getExtension(token);
					let str = `@property --${token.name} { `;
					str += `syntax: '${cssProp.syntax}'; `;
					str += `inherits: ${cssProp.inherits}; `;
					if (cssProp.initialValue) {
						str += `initial-value: ${cssProp.initialValue}; `;
					} else if (token.$value) {
						str += `initial-value: ${convertHelper(token)}; `;
					}
					str += '}';

					return str;
				},
			)
			.join(linebreak);
	},
};
