const StyleDictionary = require('style-dictionary');
const path = require('path');
const tokenConfig = require(path.join(__dirname, 'tokenConfig.js'));
const defaults = require(path.join(__dirname, 'defaults.js'));

/**
 * @param {Object} options
 */
module.exports = (options) => {
	const opts = Object.assign(defaults, options);
	const styledictionary = StyleDictionary.extend(tokenConfig(opts));
	styledictionary.cleanAllPlatforms();
};
