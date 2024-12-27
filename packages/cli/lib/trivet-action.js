import path from 'path';
import fs from 'fs';
import { transform } from 'lightningcss';

/**
 * @typedef {Object} ConfigOptions
 * @property {string} buildPath
 * @property {boolean} minify
 * @property {string} layer
 */

/**
 * Processes each token file.
 */
function processTokenFile(tokenFiles) {
	const { options, destination } = tokenFiles;
	getFileContent(options, destination);
}

/**
 * Gets content from file.
 *
 * @param {ConfigOptions} options
 * @param {string} destination
 */
function getFileContent(options, destination) {
	const { buildPath, minify, layer } = options;
	const filePath = path.join(buildPath, destination);
	if (fs.existsSync(filePath)) {
		const fileData = fs.readFileSync(filePath, { encoding: 'utf8' });
		let transformedData =
			layer === '' ? `${fileData}\n` : `@layer ${layer} {\n${fileData}\n}\n`;
		let cssString;
		if (minify) {
			cssString = transform({
				filename: `${destination}`,
				code: Buffer.from(transformedData),
				minify: true,
				errorRecovery: true,
				sourceMap: false,
			}).code.toString();
		}
		console.log(filePath);
		fs.writeFileSync(filePath, cssString || transformedData);
	}
}

export default {
	name: 'trivet',
	do: function (...args) {
		const tokenFiles = args.map(o => o)[1]?.files || [];
		tokenFiles.forEach(processTokenFile);
	},
	undo: function () {
		// No Undo. Lets live on the edge!
	},
};
