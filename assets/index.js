/* styles */
import resetCSS from './styles/reset.css' assert { type: 'css' };
import normalizeCSS from './styles/normalize.css' assert { type: 'css' };
import trivetCSS from './styles/trivet.css' assert { type: 'css' };
export { resetCSS, normalizeCSS, trivetCSS };

/* tokens */
//import '../designtokens/build/css/trvt_tokens.css';

/* Scripts */
export { hasCSSLayerSupport } from './scripts/hasCSSLayerSupport.js';
export { loadFont } from './scripts/loadFont.js';
export { CSSString2CSSStyleSheet } from './scripts/CSSString2CSSStyleSheet.js';
export { insertIntoCssLayer } from './scripts/insertIntoCssLayer.js';

/* icons */
export { iconFonts } from './build/icons.js';
