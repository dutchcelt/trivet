const iconFontVersion = `v1.1`;

/**
 * convert icon font to woff2 format
 */
import wawoff from 'wawoff2';
import fs from 'fs';
const sourceFile = fs.readFileSync(`./icons/trvt-icons-${iconFontVersion}/fonts/trvt-icons.ttf`);
const iconFile = './build/trvt-icons.woff2';

wawoff.compress(sourceFile).then(convertedFile => {
	fs.writeFileSync(iconFile, convertedFile)
  });


/**
 * Convert a scss var file to a css :root custom property file
 */
import { sassToCssVars } from './scripts/sassToCssVars.js';
const iconglyphsObject = {
	src: `./icons/trvt-icons-${iconFontVersion}/variables.scss`, 
	dest: './build/glyphs.css'
}
sassToCssVars.convert(iconglyphsObject);



/**
 * Convert a scss var file to a css file with classes to 
 */
 import { createIconClasses } from './scripts/createIconClasses.js';
 const iconClassesObject = {
	 src: `./icons/trvt-icons-${iconFontVersion}/variables.scss`, 
	 dest: './build/trvt-icon-classes.css'
 }
 createIconClasses.convert(iconClassesObject);
 

import styles from 'rollup-plugin-styles';
export default {
	input: './icons/index.js',
	preserveModules: false,
	output: {
		dir: './build',
		entryFileNames: 'icons.js',
		chunkFileNames: '[name].js',
		assetFileNames: '[name][extname]',
	},
	plugins: [styles()],
};
