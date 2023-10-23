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

const path = require('path');

const { scope, cssPropExtension } = require(path.join(__dirname, 'defaults.cjs'));

/**
 * stringSort
 * @param {string} a
 * @param {string} b
 */
const stringSort = (a, b) => (a === b ? 0 : a > b ? 1 : -1);

/**
 * getExtension
 * @param {Object} token
 * @param {string} prefix
 * @returns {Object}
 */
const getExtension = (token, prefix = scope) => token.$extensions[`${prefix}.${cssPropExtension}`];

/**
 * hasExtension
 * @param {Object} token
 * @param {string} prefix
 * @returns {boolean}
 */
const hasExtension = (token, prefix = scope) => {
	const ext = token.$extensions;
	const extScope = ext && ext[`${prefix}.${cssPropExtension}`];
	return typeof extScope?.inherits === 'boolean';
};

/**
 * Format object for Style Dictionary
 * @type {Object}
 */
module.exports = {
	'css/property': function ({ dictionary, platform }) {
		const { allTokens } = dictionary;
		const { prefix } = platform;
		// https://drafts.css-houdini.org/css-properties-values-api/#the-css-property-rule-interface
		return allTokens
			.sort((/** @type{Object} */ tokenA, /** @type{Object} */ tokenB) => stringSort(tokenA.name, tokenB.name))
			.filter((/** @type{Object} */ token) => hasExtension(token, prefix))
			.map((/** @type{Object} */ token) => {
				const cssProp = getExtension(token, prefix);
				let str = `@property --${token.name} { `;
				str += `syntax: '${cssProp.syntax}' ;`;
				str += `inherits: ${cssProp.inherits}; `;
				if (cssProp.initialValue) {
					str += `initial-value: ${cssProp.initialValue}; `;
				} else if (token.value) {
					str += `initial-value: ${token.value}; `;
				}
				str += '}';

				return str;
			})
			.join('\n');
	},
};
