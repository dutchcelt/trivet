// @ts-nocheck
import * as fs from 'fs';
import StyleDictionary from 'style-dictionary';
import * as path from 'path';
import { transform } from 'lightningcss';
import { fileURLToPath } from 'url';
// Get the file path of the current module
const __filename = fileURLToPath(import.meta.url);
// Resolve the directory name (equivalent to __dirname)
const __dirname = path.dirname(__filename);

/**
 * Registers an action called 'trivet' with the Style Dictionary.
 * @see {StyleDictionary}
 */
StyleDictionary.registerAction({
	name: 'trivet',
	do: function (...args) {
		const config = { args };
		const tokenFiles = config.args?.[1]?.files || [];
		tokenFiles.forEach(processTokenFile);
	},
	undo: function () {
		// No Undo. Lets live on the edge!
	},
});

const tokenConfigPath = path.join(__dirname, 'tokenConfig.js');
/**
 * @typedef {import('./defaults.js').Defaults} Defaults
 * @type {Defaults}
 */
const tokenConfig = await import(tokenConfigPath).then(m => m.default);
const defaultsPath = path.join(__dirname, 'defaults.js');

/**
 * @type {Defaults}
 */
const defaults = await import(defaultsPath).then(m => m.default);

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
	const { options, destination } = tokenConfig;
	getFileContent(options, destination);
}

/**
 * Gets content from file.
 *
 * @param {ConfigOptions} options
 * @param {string} destination
 */
function getFileContent(options, destination) {
	const { buildPath, minify, layer } = options;
	const filePath = path.join(buildPath, destination);
	if (fs.existsSync(filePath)) {
		const fileData = fs.readFileSync(filePath, { encoding: 'utf8' });
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
export default async userOptions => {
	const opts = Object.assign(defaults, userOptions);
	// @ts-ignore
	const styleDictionary = await new StyleDictionary(tokenConfig(opts));
	await styleDictionary.buildAllPlatforms();
};
