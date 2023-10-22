const path = require('path');
const shell = require('shelljs');

const defaultTokensPackagePath = shell.exec('npm ls @trvt/designtokens -ps', {
	silent: true,
}).stdout;
const tokensPath = path.join(defaultTokensPackagePath.trim(), 'tokens');

module.exports = {
	buildPath: path.resolve('build', 'css'),
	layer: '',
	sourcePath: tokensPath,
	themePath: undefined,
	scope: undefined,
	filename: 'tokens.css',
	cssPropExtension: 'css.property',
	exclude: 'lib',
};
