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
 * getFileContent
 * @param {String} file - This is the path to the file
 * @param {Object} opts
 */
const getFileContent = (file, opts) => {
	const lb = opts.minify ? '' : '\n';
	const tab = opts.minify ? '' : '\t';

	const data = fs.readFileSync(file, { encoding: 'utf8' });
	let transformedData =
		opts.layer === ''
			? `${data}${lb}`
			: `@layer ${opts.layer} {${lb}${tab}${data}${lb}}${lb}`;

	if (opts.minify) {
		transformedData = transform({
			filename: `${opts.scope}_${opts.filename}`,
			code: Buffer.from(transformedData),
			minify: true,
			errorRecovery: true,
			sourceMap: false,
		}).code.toString();
	}

	fs.writeFileSync(file, transformedData);
};

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

	getFileContent(`${opts.buildPath}/${opts.scope}_${opts.filename}`, opts);
};
