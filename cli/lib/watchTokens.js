const path = require('node:path');
const generateTokens = require(path.join(__dirname, 'generateTokens.js'));
const chokidar = require('chokidar');

/**
 * @param {Object} opts
 */
module.exports = (opts) => {
	opts.watch = false;
	chokidar.watch(opts.themePath || opts.sourcePath).on('change', (event) => {
		if (!!event) {
			console.log('\nChanged file:', event);
			generateTokens(opts);
		}
	});
};
