/* Styles */
// @ts-expect-error
import layersCSS from './src/index.css' with { type: 'css' };
// @ts-expect-error
import resetCSS from './src/base/reset.css' with { type: 'css' };
// @ts-expect-error
import defaultsCSS from './src/base/defaults.css' with { type: 'css' };
// @ts-expect-error
import tokensCSS from './src/design/tokens.css' with { type: 'css' };
// @ts-expect-error
import foundationCSS from './src/design/foundation.css' with { type: 'css' };
// @ts-expect-error
import utilitiesCSS from './src/design/utilities.css' with { type: 'css' };

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
