const StyleDictionary = require('style-dictionary-utils');
const path = require('path');

/**
 * Represents the configuration for tokens.
 *
 * @typedef {Object} TokenConfig
 * @property {string} path - The path of the token configuration file.
 */
const tokenConfig = require(path.join(__dirname, 'tokenConfig.cjs'));
const defaults = require(path.join(__dirname, 'defaults.cjs'));

/**
 * @param {Object} options
 */
module.exports = options => {
	const opts = Object.assign(defaults, options);
	const styledictionary = StyleDictionary.extend(tokenConfig(opts));
	styledictionary.cleanAllPlatforms();
};
