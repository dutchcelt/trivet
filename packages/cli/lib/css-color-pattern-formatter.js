import colorPatternsExtension from './defaults.js';
/**
 * stringSort
 * @param {string} a
 * @param {string} b
 */
const stringSort = (a, b) => (a === b ? 0 : a > b ? 1 : -1);

/**
 * getExtension
 * @param {import('style-dictionary').Token} token
 * @returns {import('style-dictionary').TransformedToken}
 */
const getExtension = token => token.$extensions[`${colorPatternsExtension}`];

/**
 * hasExtension
 * @param {import('style-dictionary').TransformedToken} token
 * @returns {boolean}
 */
const hasExtension = token => {
	const ext = token.$extensions;
	const extScope = ext && ext[`${colorPatternsExtension}`];
	return !!extScope;
};

/**
 * colorSchemeFn
 * @param {import('style-dictionary').Token} token
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
 * @param {import('style-dictionary').Token} token
 * @param {any} modeType - light or dark
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
	/**
	 * Processes a dictionary of tokens to generate a CSS string containing color schemes for light and dark modes.
	 *
	 * @param {{dictionary: import('style-dictionary').Dictionary, options: any}} args - The function parameters.
	 * @return {string} The generated CSS string, including light and dark mode color schemes.
	 */
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
					/** @type {import('style-dictionary').Token} cssColorContrast*/
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
				},
			)
			.join(linebreak);

		const allStrings =
			dataDarkModeWrapper.join('') + dataLightModeWrapper.join('') + str;
		return allStrings;
	},
};
