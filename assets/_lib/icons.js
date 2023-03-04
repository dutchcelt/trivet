import { URL } from 'url';
const __parentname = new URL('..', import.meta.url).pathname;

const iconFontVersion = `v1.1`;
const iconFontName = `trvt-icons`;
const iconFontDir = `${iconFontName}-${iconFontVersion}`;
const iconFontPath = `${iconFontDir}/fonts`;
const iconAssetPath = `${__parentname}/icons`;
const stylesAssetPath = `${__parentname}/styles`;
const stylesAssetTarget = `${__parentname}/build`;
const iconAssetTarget = `${__parentname}/build`;
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
import { sassToCss } from './sassToCss.js';
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
	rule: `@layer design.tokens `,
	withPropValues: false,
});
