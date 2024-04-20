import * as fs from 'fs';
import * as path from 'path';
import { hashCode } from '../scripts/hashcode.js';
import { getCSS } from './getCSS.js';

/**
 * Write a bundled css file to 'dist'
 * @param {string} distPath - The 'dist' directory path
 * @param {string} filename - The name of the file to write to disk (i.e. 'styles.css')
 * @param {string[]} styleSheetPaths - An array of style sheet paths to bundle.
 * @returns {string} A hashed filename
 */
const writeCSS = (distPath, filename, styleSheetPaths) => {
	fs.mkdirSync(distPath, { recursive: true });
	const cssData = styleSheetPaths.reduce((a, c) => (a += getCSS(c)), '');
	const cssDataHash = Math.abs(hashCode(cssData));
	const hashedFileName = filename.split('.')[0] + '-' + cssDataHash + '.css';
	const resolvedFile = path.resolve(distPath, hashedFileName);
	fs.writeFileSync(resolvedFile, cssData);
	return hashedFileName;
};

export { writeCSS };
