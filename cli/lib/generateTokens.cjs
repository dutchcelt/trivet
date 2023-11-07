const fs = require('fs');
const StyleDictionary = require('style-dictionary');
const path = require('path');
const { transform } = require('lightningcss');

/**
 * @typedef {import('./defaults.cjs').Defaults} Defaults
 */

const tokenConfig = require(path.join(__dirname, 'tokenConfig.cjs'));
/**
 * @type {Defaults}
 */
const defaults = require(path.join(__dirname, 'defaults.cjs'));

/**
 * module.exports
 * @param {Defaults} options - All the default values
 */
module.exports = options => {
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
	const getFileContent = file => {
		const data = fs.readFileSync(file, { encoding: 'utf8' });
		let transformedData =
			opts.layer === ''
				? `${data}\n`
				: `@layer ${opts.layer} {\n${data}\n}\n`;
		transformedData = opts.minify
			? transform({
				code: Buffer.from(transformedData),
				minify: true,
				errorRecovery: true,
				sourceMap: false,
			}).code.toString()
			: transformedData;
		const bufferedData = Buffer.alloc(
			transformedData.length,
			transformedData,
			'utf8'
		);

		fs.writeFileSync(file, bufferedData);
	};

	getFileContent(`${opts.buildPath}/${opts.scope}_${opts.filename}`);
};
