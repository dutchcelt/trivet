import fs from 'fs';
import { URL } from 'url';
const __parentname = new URL('..', import.meta.url).pathname;

const iconFontVersion = `v1.1`;
const iconFontName = `trvt-icons`;
const iconFontDir = `${iconFontName}-${iconFontVersion}`;
const iconFontPath = `${iconFontDir}/fonts`;
const iconAssetPath = `${__parentname}/icons`;
const stylesAssetPath = `${__parentname}/styles`;
const buildPath = `${__parentname}/dist`;
const iconFontVariableSource = `${iconAssetPath}/${iconFontDir}/variables.scss`;

try {
	fs.existsSync(buildPath) &&
		fs.rmSync(buildPath, { recursive: true, force: true }, () => {});
	fs.mkdirSync(buildPath);
} catch (err) {
	console.error(err);
}

/**
 * convert icon font to woff2 format
 */
import wawoff from 'wawoff2';
const sourceFile = fs.readFileSync(
	`${iconAssetPath}/${iconFontPath}/${iconFontName}.ttf`,
);
const iconFile = `${buildPath}/${iconFontName}.woff2`;

wawoff.compress(sourceFile).then(convertedFile => {
	fs.writeFileSync(iconFile, convertedFile);
});

/**
 * Convert a scss var file to a css :root custom property file
 */
import { sassToCss } from './sassToCss.js';
sassToCss.convert({
	src: iconFontVariableSource,
	dest: `${buildPath}/glyphs.css`,
	rule: `:root `,
	withPropValues: true,
});

/**
 * Convert a scss var file to a css file with classes to
 */
sassToCss.convert({
	src: iconFontVariableSource,
	dest: `${buildPath}/${iconFontName}-classes.css`,
	rule: `@layer design.tokens `,
	withPropValues: false,
});
