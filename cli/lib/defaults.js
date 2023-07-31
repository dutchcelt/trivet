const path = require('node:path');
const { getInstalledPathSync } = require('get-installed-path');
const trivetTokensPath = getInstalledPathSync('@trvt/designtokens', {
	paths: process.mainModule.paths,
});

module.exports = {
	buildPath: path.resolve(`build`, `css`),
	layer: 'design.tokens',
	sourcePath: path.resolve(trivetTokensPath, 'tokens'),
	themePath: undefined,
	scope: `trvt`,
	filename: `tokens.css`,
};
