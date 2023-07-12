const path = require('path');
const generateTokens = require(path.join(__dirname, 'generateTokens.js'));
const chokidar = require('chokidar');

module.exports = (opts) => {
	opts.watch = false;
	chokidar
		.watch(opts.themePath || opts.sourcePath)
		.on('change', (event, path) => {
			if (!!event) {
				console.log('\nChanged file:', event);
				generateTokens(opts);
			}
		});
};
