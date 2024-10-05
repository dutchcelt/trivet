import * as fs from 'fs';
import { bundle } from 'lightningcss';

/**
 * Retrieves the minified CSS code from a given CSS file.
 *
 * @param {string} cssFile - The path to the CSS file.
 * @returns {string|undefined} - The minified CSS code or undefined if the file does not exist.
 */
const getCSS = cssFile => {
	if (!fs.existsSync(cssFile)) return;
	const { code } = bundle({
		filename: cssFile,
		minify: true,
	});
	// @ts-ignore
	return code;
};

export { getCSS };
