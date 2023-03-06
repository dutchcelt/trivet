/* Base styles for all Trivet Components */
import { loadFont, throttler, trivetCSS } from '@trvt/assets';
const styles = [...trivetCSS];
document.adoptedStyleSheets = [...document.adoptedStyleSheets, ...styles];
export { styles };
