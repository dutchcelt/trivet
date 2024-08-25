// @ts-nocheck
const fs = require('fs');
const StyleDictionary = require('style-dictionary-utils');
const path = require('path');
const {transform} = require('lightningcss');

/**
 * Registers an action called 'trivet' with the Style Dictionary.
 * @see {StyleDictionary}
 */
StyleDictionary.registerAction({
	name: 'trivet',
	do: function (...args) {
		const config = {args};
		const tokenFiles = config.args?.[1]?.files || [];
		tokenFiles.forEach(processTokenFile);
	},
	undo: function () {
		// No Undo. Lets live on the edge!
	},
});

const tokenConfigPath = path.join(__dirname, 'tokenConfig.cjs');
/**
 * @typedef {import('./defaults.cjs').Defaults} Defaults
 * @type {Defaults}
 */
const tokenConfig = require(tokenConfigPath);
const defaultsPath = path.join(__dirname, 'defaults.cjs');
/**
 * @type {Defaults}
 */
const defaults = require(defaultsPath);

/**
 * @typedef {Object} ConfigOptions
 * @property {string} buildPath
 * @property {boolean} minify
 * @property {string} layer
 */

/**
 * Processes each token file.
 *
 * @param {Object} tokenConfig
 * @param {ConfigOptions} tokenConfig.options
 * @param {string} tokenConfig.destination
 */
function processTokenFile(tokenConfig) {
	const {options, destination} = tokenConfig;
	getFileContent(options, destination);
}

/**
 * Gets content from file.
 *
 * @param {ConfigOptions} options
 * @param {string} destination
 */
function getFileContent(options, destination) {
	const {buildPath, minify, layer} = options;
	const filePath = path.join(buildPath, destination);
	if (fs.existsSync(filePath)) {
		const fileData = fs.readFileSync(filePath, {encoding: 'utf8'});
		let transformedData =
			layer === '' ? `${fileData}\n` : `@layer ${layer} {\n${fileData}\n}\n`;
		let cssString;
		if (minify) {
			cssString = transform({
				filename: `${destination}`,
				code: Buffer.from(transformedData),
				minify: true,
				errorRecovery: true,
				sourceMap: false,
			}).code.toString();
		}
		console.log(filePath);
		fs.writeFileSync(filePath, cssString || transformedData);
	}
}

/**
 * Exports a function that extends the Style Dictionary with user options.
 *
 * @param {Defaults} userOptions
 */
module.exports = userOptions => {
	const opts = Object.assign(defaults, userOptions);
	// @ts-ignore
	const styleDictionary = StyleDictionary.extend(tokenConfig(opts));
	styleDictionary.buildAllPlatforms();
};
