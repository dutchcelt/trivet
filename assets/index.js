/* styles */
import resetCSS from './styles/base/reset.css' assert { type: 'css' };
import defaultsCSS from './styles/base/defaults.css' assert { type: 'css' };
import tokensCSS from './styles/design/tokens.css' assert { type: 'css' };
import foundationCSS from './styles/design/foundation.css' assert { type: 'css' };
import utilitiesCSS from './styles/design/utilities.css' assert { type: 'css' };

export const trivetCSS = [
	resetCSS,
	defaultsCSS,
	tokensCSS,
	foundationCSS,
	utilitiesCSS,
];

/* Scripts */
//export { hasCSSLayerSupport } from './scripts/hasCSSLayerSupport.js';
export { loadFont } from './scripts/loadFont.js';
export { throttler } from './scripts/throttler.js';
//export { CSSString2CSSStyleSheet } from './scripts/CSSString2CSSStyleSheet.js';
//export { insertIntoCssLayer } from './scripts/insertIntoCssLayer.js';
//export { generateUUID } from './scripts/generateUUID.js';
//export { injectDocumentStyles } from './scripts/injectDocumentStyles.js';

/* icons */
//export { iconFonts } from './build/icons.js';
