import * as fs from 'fs';
import { bundle } from 'lightningcss';

/**
 * Get the CSS from a style sheet. This also inlines all the CSS imports.
 * @param {string} cssFile - A resolved path to a stylesheet
 * @return {Uint8Array} A single minified css string.
 */
const getCSS = cssFile => {
	if (!fs.existsSync(cssFile)) return;
	const { code } = bundle({
		filename: cssFile,
		minify: true,
	});
	return code;
};

export { getCSS };
