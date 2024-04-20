/* Styles */
/** @ts-expect-error */
import layersCSS from './styles/index.css' assert { type: 'css' };
/** @ts-expect-error */
import resetCSS from './styles/base/reset.css' assert { type: 'css' };
/** @ts-expect-error */
import defaultsCSS from './styles/base/defaults.css' assert { type: 'css' };
/** @ts-expect-error */
import tokensCSS from './styles/design/tokens.css' assert { type: 'css' };
/** @ts-expect-error */
import foundationCSS from './styles/design/foundation.css' assert { type: 'css' };
/** @ts-expect-error */
import utilitiesCSS from './styles/design/utilities.css' assert { type: 'css' };

/**
 * trivetCSS is an array that holds the CSS files for the trivet application.
 * @type {Array<CSSStyleSheet>}
 */
export const trivetCSS = [
	layersCSS,
	resetCSS,
	defaultsCSS,
	tokensCSS,
	foundationCSS,
	utilitiesCSS,
];

/* Scripts */
export { hasCSSLayerSupport } from './scripts/hasCSSLayerSupport.js';
export { loadFont } from './scripts/loadFont.js';
export { throttler } from './scripts/throttler.js';
export { CSSString2CSSStyleSheet } from './scripts/CSSString2CSSStyleSheet.js';
export { insertIntoCssLayer } from './scripts/insertIntoCssLayer.js';
export { generateUUID } from './scripts/generateUUID.js';
export { injectDocumentStyles } from './scripts/injectDocumentStyles.js';

/* icons */
// import iconFace from './icons/icons.css' assert { type: 'css' };
// import glyphs from './build/glyphs.css' assert { type: 'css' };
// import classes from './build/trvt-icons-classes.css' assert { type: 'css' };
// export const iconFonts = [iconFace, glyphs, classes];
