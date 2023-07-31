const fs = require('node:fs');
const StyleDictionary = require('style-dictionary');
const path = require('path');

const tokenConfig = require(path.join(__dirname, 'tokenConfig.js'));
const watchTokens = require(path.join(__dirname, 'watchTokens.js'));
const defaults = require(path.join(__dirname, 'defaults.js'));

/**
 * @param {Object} options
 */
module.exports = (options) => {
	/**
	 * @type {Object}
	 */
	const opts = Object.assign(defaults, options);

	const styledictionary = StyleDictionary.extend(tokenConfig(opts));
	styledictionary.buildAllPlatforms();

	/**
	 * getFileContent
	 * @param {String} file - This is the path to the file
	 */
	const getFileContent = (file) => {
		const data = fs.readFileSync(file, { encoding: 'utf8' });
		const transformedData = `@layer ${opts.layer} {\n${data}\n}\n`;
		const bufferedData = Buffer.alloc(transformedData.length, transformedData, 'utf8');

		fs.writeFileSync(file, bufferedData);
	};

	getFileContent(`${opts.buildPath}/${opts.scope}_${opts.filename}`);

	if (opts.watch === true) watchTokens(opts);
};
