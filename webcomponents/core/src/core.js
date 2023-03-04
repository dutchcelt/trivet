/* Base styles for all Trivet Components */
import { iconFonts, loadFont, throttler, trivetCSS } from '@trvt/assets';
const styles = [...iconFonts, ...trivetCSS];
document.adoptedStyleSheets = [...document.adoptedStyleSheets, ...styles];
export { styles };
