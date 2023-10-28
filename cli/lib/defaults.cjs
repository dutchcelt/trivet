const path = require('path');
const shell = require('shelljs');

const defaultTokensPackagePath = shell.exec('npm ls @trvt/designtokens -ps', {
	silent: true,
}).stdout;
const tokensPath = path.join(defaultTokensPackagePath.trim(), 'tokens');

/**
 * The Defaults interface.
 * @typedef {Object} Defaults
 * @property {string} buildPath -
 * @property {string} layer -
 * @property {string} sourcePath -
 * @property {string} themePath -
 * @property {string} scope -
 * @property {string} filename -
 * @property {string} cssPropExtension -
 * @property {string} exclude -
 */

/**
 * Exports
 * @type {Defaults}
 */
module.exports = {
	buildPath: path.resolve('build', 'css'),
	layer: '',
	sourcePath: tokensPath,
	themePath: '',
	scope: 'trvt',
	filename: 'tokens.css',
	cssPropExtension: 'www.css.property.rule',
	exclude: 'lib',
};
