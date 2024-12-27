// @ts-nocheck

import colorPatternsExtension from './defaults.js';
/**
 * stringSort
 * @param {string} a
 * @param {string} b
 */
const stringSort = (a, b) => (a === b ? 0 : a > b ? 1 : -1);

/**
 * getExtension
 * @param {Object} token
 * @returns {Object}
 */
const getExtension = token => token.$extensions[`${colorPatternsExtension}`];

/**
 * hasExtension
 * @param {Object} token
 * @returns {boolean}
 */
const hasExtension = token => {
	const ext = token.$extensions;
	const extScope = ext && ext[`${colorPatternsExtension}`];
	return !!extScope;
};

/**
 * colorSchemeFn
 * @param {Object} token
 * @param {string} modeType - light or dark
 * @returns {string}
 */
// const colorSchemeFn = (token, modeType) => `[data-color-scheme='${modeType}'] {
// 	--${token.name}:  ${getExtension(token).mode[modeType].$value};
// }
// @media (prefers-color-scheme: ${modeType}) {
// 	:root {
// 		--${token.name}:  ${getExtension(token).mode[modeType].$value};
// 	}
// }`;

/**
 * getColorSchemeProperty
 * @param {Object} token
 * @param {string} modeType - light or dark
 * @returns {string}
 */
const getColorSchemeProperty = (token, modeType) =>
	`--${token.name}:  ${getExtension(token).mode[modeType].value};`;

/**
 * Format object for Style Dictionary
 * @type {Object}
 */
export default {
	name: 'css/colorpattern',
	format: function ({ dictionary, options }) {
		const linebreak = options.minify ? '' : '\n';
		const { allTokens } = dictionary;
		const dataDarkModeWrapper = [
			`[data-color-scheme='dark'] { color-scheme: dark; `,
			'',
			'}',
		];
		const dataLightModeWrapper = [
			`[data-color-scheme='light'] { color-scheme: light; `,
			'',
			'}',
		];

		const str = allTokens
			.sort((/** @type{Object} */ tokenA, /** @type{Object} */ tokenB) =>
				stringSort(tokenA.name, tokenB.name),
			)
			.filter((/** @type{Object} */ token) => hasExtension(token))
			.map((/** @type{Object} */ token) => {
				/** @type {Object} cssColorContrast*/
				const cssColorPattern = getExtension(token);
				let cssString = '';
				if (cssColorPattern.mode?.light) {
					//cssString += colorSchemeFn(token, 'light');
					dataLightModeWrapper[1] += getColorSchemeProperty(token, 'light');
				}
				if (cssColorPattern.mode?.dark) {
					//cssString += colorSchemeFn(token, 'dark');
					dataDarkModeWrapper[1] += getColorSchemeProperty(token, 'dark');
				}
				// if (cssColorPattern.inverted)
				// 	cssString += `@property --${token.name}-inverted}: { syntax: '<color>'; inherits: true; initial-value: ${cssColorPattern.inverted.$value}; }`;

				return cssString;
			})
			.join(linebreak);

		const allStrings =
			dataDarkModeWrapper.join('') + dataLightModeWrapper.join('') + str;
		return allStrings;
	},
};
