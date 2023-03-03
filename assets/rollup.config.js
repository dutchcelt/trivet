const iconFontVersion = `v1.1`;
const iconFontName = `trvt-icons`;
const iconFontDir = `${iconFontName}-${iconFontVersion}`;
const iconFontPath = `${iconFontDir}/fonts`;
const iconAssetPath = './icons';
const stylesAssetPath = './styles';
const stylesAssetTarget = './build';
const iconAssetTarget = './build';
const iconFontVariableSource = `${iconAssetPath}/${iconFontDir}/variables.scss`;

/**
 * convert icon font to woff2 format
 */
import wawoff from 'wawoff2';
import fs from 'fs';
const sourceFile = fs.readFileSync(
	`${iconAssetPath}/${iconFontPath}/${iconFontName}.ttf`
);
const iconFile = `${iconAssetTarget}/${iconFontName}.woff2`;

wawoff.compress(sourceFile).then((convertedFile) => {
	fs.writeFileSync(iconFile, convertedFile);
});

/**
 * Convert a scss var file to a css :root custom property file
 */
import { sassToCss } from './scripts/sassToCss.js';
sassToCss.convert({
	src: iconFontVariableSource,
	dest: `${iconAssetTarget}/glyphs.css`,
	rule: `:root `,
	withPropValues: true,
});

/**
 * Convert a scss var file to a css file with classes to
 */
sassToCss.convert({
	src: iconFontVariableSource,
	dest: `${iconAssetTarget}/${iconFontName}-classes.css`,
	rule: `@layer trivet.tokens `,
	withPropValues: false,
});

import css from 'rollup-plugin-native-css-modules';
import { transform } from 'lightningcss';

export default [
	{
		input: ['index.js'],
		output: {
			format: 'es',
			file: 'build/bundle.js',
		},
		plugins: [
			css({
				transform: (css) =>
					transform({
						code: Buffer.from(css),
						minify: true,
						sourceMap: false,
					}).code.toString(),
			}),
		],
	},
];
