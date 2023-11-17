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
const colorSchemeFn = (token, modeType) => `[data-color-scheme='${modeType}'] {
	--${token.name}:  ${getExtension(token).mode[modeType].value};
}
@media (prefers-color-scheme: ${modeType}) {
	:root { 
		--${token.name}:  ${getExtension(token).mode[modeType].value}; 
	}
}`;

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
module.exports = {
	'css/colorpattern': function ({ dictionary, options }) {
		const linebreak = options.minify ? '' : '\n';
		const { allTokens } = dictionary;
		let dataDarkModeWrapper = [
			`:root[data-color-scheme='dark'] {`,
			'',
			'}',
		];
		let dataLightModeWrapper = [
			`:root[data-color-scheme='light'] {`,
			'',
			'}',
		];
		let prefersDarkModeWrapper = [
			`@media (prefers-color-scheme: dark) {:root {`,
			``,
			`}}`,
		];
		let prefersLightModeWrapper = [
			`@media (prefers-color-scheme: light) {:root {`,
			``,
			`}}`,
		];
		const str = allTokens
			.sort((/** @type{Object} */ tokenA, /** @type{Object} */ tokenB) =>
				stringSort(tokenA.name, tokenB.name)
			)
			.filter((/** @type{Object} */ token) => hasExtension(token))
			.map((/** @type{Object} */ token) => {
				/** @type {Object} cssColorContrast*/
				const cssColorPattern = getExtension(token);
				let cssString = '';
				if (cssColorPattern.mode?.light) {
					//cssString += colorSchemeFn(token, 'light');
					dataLightModeWrapper[1] += getColorSchemeProperty(
						token,
						'light'
					);
					prefersLightModeWrapper[1] += getColorSchemeProperty(
						token,
						'dark'
					);
				}
				if (cssColorPattern.mode?.dark) {
					//cssString += colorSchemeFn(token, 'dark');
					dataDarkModeWrapper[1] += getColorSchemeProperty(
						token,
						'dark'
					);
					prefersDarkModeWrapper[1] += getColorSchemeProperty(
						token,
						'dark'
					);
				}
				if (cssColorPattern.contrast)
					cssString += `@property --${token.name}-contrast}: { syntax: '<color>'; inherits: true; initial-value: ${cssColorPattern.contrast.value}; }`;

				return cssString;
			})
			.join(linebreak);

		const allStrings =
			prefersDarkModeWrapper.join('') +
			prefersLightModeWrapper.join('') +
			dataDarkModeWrapper.join('') +
			dataLightModeWrapper.join('') +
			str;
		console.log(allStrings);
		return allStrings;
	},
};
