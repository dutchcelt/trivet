const path = require('path');

const { colorPatternExtension } = require(path.join(__dirname, 'defaults.cjs'));

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
const getExtension = token => token.$extensions[`${colorPatternExtension}`];

/**
 * hasExtension
 * @param {Object} token
 * @returns {boolean}
 */
const hasExtension = token => {
	const ext = token.$extensions;
	const extScope = ext && ext[`${colorPatternExtension}`];
	return !!extScope;
};

/**
 * colorSchemeFn
 * @param {Object} token
 * @param {string} modeType - light or dark
 * @returns {string}
 */
const colorSchemeFn = (
	token,
	modeType
) => `@media (prefers-color-scheme: ${modeType}) {
	:root { 
			--${token.name}:  ${getExtension(token).mode[modeType].value}; 
	}
}`;

/**
 * Format object for Style Dictionary
 * @type {Object}
 */
module.exports = {
	'css/colorpattern': function({ dictionary, options }) {
		const linebreak = options.minify ? '' : '\n';
		const { allTokens } = dictionary;
		const str = allTokens
			.sort((/** @type{Object} */ tokenA, /** @type{Object} */ tokenB) =>
				stringSort(tokenA.name, tokenB.name)
			)
			.filter((/** @type{Object} */ token) => hasExtension(token))
			.map((/** @type{Object} */ token) => {
				/** @type {Object} cssColorContrast*/
				const cssColorPattern = getExtension(token);
				let cssString = '';
				if (cssColorPattern.mode?.light)
					cssString += colorSchemeFn(token, 'light');
				if (cssColorPattern.mode?.dark)
					cssString += colorSchemeFn(token, 'dark');

				if (cssColorPattern.contrast)
					cssString += `@property --${token.name}-contrast}: { syntax: '<color>'; inherits: true; initial-value: ${cssColorPattern.contrast.value}; }`;

				return cssString;
			})
			.join(linebreak);
		return str;
	},
};
