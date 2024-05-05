/* Styles */
import layersCSS from './styles/index.css' with { type: 'css' };
import resetCSS from './styles/base/reset.css' with { type: 'css' };
import defaultsCSS from './styles/base/defaults.css' with { type: 'css' };
import tokensCSS from './styles/design/tokens.css' with { type: 'css' };
import foundationCSS from './styles/design/foundation.css' with { type: 'css' };
import utilitiesCSS from './styles/design/utilities.css' with { type: 'css' };

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
