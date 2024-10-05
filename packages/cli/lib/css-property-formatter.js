// @ts-nocheck
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

import cssPropExtension from './defaults.js';

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
 * @param {Object} token
 * @returns {CSSPropertyRule}
 */
const getExtension = token => token.$extensions[`${cssPropExtension}`];

/**
 * hasExtension
 * @param {Object} token
 * @returns {boolean}
 */
const hasExtension = token => {
	const ext = token.$extensions;
	const extScope = ext && ext[`${cssPropExtension}`];
	return typeof extScope?.inherits === 'boolean';
};

const { transform, filter } = await import('./css-system-color-transformer.js');

const convertHelper = token => {
	return filter(token) ? transform(token) : token.$value || token.value;
};

/**
 * Format object for Style Dictionary
 * @type {Object}
 */
export default {
	'css/property': function ({ dictionary, options }) {
		const linebreak = options.minify ? '' : '\n';
		const { allTokens } = dictionary;
		// https://drafts.css-houdini.org/css-properties-values-api/#the-css-property-rule-interface
		return allTokens
			.sort((/** @type{Object} */ tokenA, /** @type{Object} */ tokenB) =>
				stringSort(tokenA.name, tokenB.name),
			)
			.filter((/** @type{Object} */ token) => hasExtension(token))
			.map((/** @type{Object} */ token) => {
				/** @type {CSSPropertyRule} cssProp*/
				const cssProp = getExtension(token);
				let str = `@property --${token.name} { `;
				str += `syntax: '${cssProp.syntax}'; `;
				str += `inherits: ${cssProp.inherits}; `;
				if (cssProp.initialValue) {
					str += `initial-value: ${cssProp.initialValue}; `;
				} else if (token.$value || token.value) {
					str += `initial-value: ${convertHelper(token)}; `;
				}
				str += '}';

				return str;
			})
			.join(linebreak);
	},
};
