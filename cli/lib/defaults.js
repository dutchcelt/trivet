const path = require('node:path');
const { getInstalledPathSync } = require('get-installed-path');
const trivetTokensPath = getInstalledPathSync('@trvt/designtokens', {
	paths: process.mainModule.paths,
});

// const shell = require('shelljs');
// const defaultTokenPath = shell.exec(`npm ls @trvt/designtokens -ps`, { silent: true }).stdout;
// const tokenPath = path.join(defaultTokenPath.trim(), `tokens`);

module.exports = {
	buildPath: path.resolve(`build`, `css`),
	layer: 'design.tokens',
	sourcePath: path.resolve(trivetTokensPath, 'tokens'),
	themePath: undefined,
	scope: `trvt`,
	filename: `tokens.css`,
};
