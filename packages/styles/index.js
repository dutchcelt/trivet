/* Styles */
// @ts-expect-error
import layersCSS from './src/index.css' with { type: 'css' };
// @ts-expect-error
import baseCSS from './src/base.css' with { type: 'css' };
// @ts-expect-error
import tokensCSS from './src/tokens.css' with { type: 'css' };
// @ts-expect-error
import utilitiesCSS from './src/utilities.css' with { type: 'css' };

/**
 * trivetCSS is an array that holds the CSS files for the trivet application.
 * @type {Array<CSSStyleSheet>}
 */
export const trivetCSS = [layersCSS, baseCSS, tokensCSS, utilitiesCSS];
