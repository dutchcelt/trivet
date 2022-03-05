const iconFontVersion = `v1.1`;
const iconFontVariableSource = `./icons/trvt-icons-${iconFontVersion}/variables.scss`;

/**
 * convert icon font to woff2 format
 */
import wawoff from 'wawoff2';
import fs from 'fs';
const sourceFile = fs.readFileSync(
	`./icons/trvt-icons-${iconFontVersion}/fonts/trvt-icons.ttf`
);
const iconFile = './build/trvt-icons.woff2';

wawoff.compress(sourceFile).then((convertedFile) => {
	fs.writeFileSync(iconFile, convertedFile);
});

/**
 * Convert a scss var file to a css :root custom property file
 */
import { sassToCss } from './scripts/sassToCss.js';
sassToCss.convert({
	src: iconFontVariableSource,
	dest: './build/glyphs.css',
	rule: `:root `,
	withPropValues: true,
});

/**
 * Convert a scss var file to a css file with classes to
 */
sassToCss.convert({
	src: iconFontVariableSource,
	dest: './build/trvt-icon-classes.css',
	rule: `@layer designsystem `,
	withPropValues: false,
});

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
