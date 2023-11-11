const fs = require('fs');
const StyleDictionary = require('style-dictionary');
const path = require('path');
const { transform } = require('lightningcss');

StyleDictionary.registerAction({
	name: 'trivet',
	do: function(...args) {
		const config = { args };
		const files = config.args?.[1]?.files || [];
		for (const tokenConfig of files) {
			getFileContent(tokenConfig);
		}
	},
	undo: function() {
		// No Undo. Lets live on the edge!
	},
});

/**
 * @typedef {import('./defaults.cjs').Defaults} Defaults
 */

const tokenConfig = require(path.join(__dirname, 'tokenConfig.cjs'));
/**
 * @type {Defaults}
 */
const defaults = require(path.join(__dirname, 'defaults.cjs'));

/**
 * getFileContent
 * @param {Object} tokenConfig
 */
const getFileContent = tokenConfig => {
	const { options } = tokenConfig;
	const { buildPath, minify, layer } = options;
	const { destination } = tokenConfig;
	const file = path.join(buildPath, destination);

	const data = fs.readFileSync(file, { encoding: 'utf8' });
	const transformedData =
		layer === '' ? `${data}\n` : `@layer ${layer} {\n${data}\n}\n`;
	let cssString = '';

	if (minify) {
		cssString = transform({
			filename: `${destination}`,
			code: Buffer.from(transformedData),
			minify: true,
			errorRecovery: true,
			sourceMap: false,
		}).code.toString();
	}
	fs.writeFileSync(file, cssString || transformedData);
};

/**
 * module.exports
 * @param {Defaults} options - All the default values
 */
module.exports = options => {
	/**
	 * @type {Defaults}
	 */
	const opts = Object.assign(defaults, options);
	const styledictionary = StyleDictionary.extend(tokenConfig(opts));
	styledictionary.buildAllPlatforms();
};
