/* Base styles for all Trivet Components */
import { iconFonts, loadFont, throttler, trivetCSS } from '@trvt/assets';
import { trvtTokensCSS } from '@trvt/designtokens';
const styles = [...iconFonts, trvtTokensCSS, ...trivetCSS];
document.adoptedStyleSheets = [...document.adoptedStyleSheets, ...styles];
export { styles };
