/* Styles */
/** @ts-expect-error */
import layersCSS from './styles/index.css' with { type: 'css' };
/** @ts-expect-error */
import resetCSS from './styles/base/reset.css' with { type: 'css' };
/** @ts-expect-error */
import defaultsCSS from './styles/base/defaults.css' with { type: 'css' };
/** @ts-expect-error */
import tokensCSS from './styles/design/tokens.css' with { type: 'css' };
/** @ts-expect-error */
import foundationCSS from './styles/design/foundation.css' with { type: 'css' };
/** @ts-expect-error */
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
