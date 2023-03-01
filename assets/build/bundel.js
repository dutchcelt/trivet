import resetCSS from './styles-e4c0806b.css' assert { type: 'css' };
import defaultsCSS from './styles-344b213f.css' assert { type: 'css' };
import tokensCSS from './styles-0d39a441.css' assert { type: 'css' };
import foundationCSS from './styles-269c8265.css' assert { type: 'css' };
import utilitiesCSS from './styles-284212f6.css' assert { type: 'css' };

/**
 * Dynamically load fonts.
 * Matches the settings used in the Design tokens (Style Dictionary).
 * @param opts
 * @param localpath
 * @returns {Promise<void>}
 */
const loadFont = async (opts, localpath = '') => {
	let { family, filename, path, style, weight, display, variationSettings } =
		opts;
	Object.values(opts).some((f) => typeof f === 'string');
	if ((!!path)) {
		if (!/^\//.test(path)) path = `/${path}`;
		if (!/^\//.test(filename)) filename = `/${filename}`;
		const url = new URL(`${localpath + path}${filename}`, import.meta.url);
		if (url) {
			const font = new FontFace(family, `url(${url})`, {
				style: style,
				weight: weight,
				variationSettings: variationSettings || 'normal',
				display: display || 'auto',
			});
			await font.load();
			document.fonts.add(font);
		}
	}
};

/**
 * throttler
 * Used to limit events that can be fired in rapid succession.
 * This can prevent an event like onresize or onscroll from thrashing the UI.
 *
 * Example: addEventListener('resize', throttler(_handler, 500), false);
 *
 * @arg {function} callback - This is the actual event handler to be passed on
 * @arg {number} ms         - The optional delay time in milliseconds (throttling)
 * @arg {object} scope      - Optional scope in which to return the function handler
 * @return {function}       - The timeout function that is triggered by the event listener on each event call
 */
const throttler = (callback, ms, scope) => {
	// An animation frame 'ticks' 60 times a second (1000ms)
	const FRAME = 1000 / 60;
	// Default delay is a single animation frame times 4
	const DELAY = ms || FRAME * 4;
	let running = false;
	const onTimeOut = (...args) => {
		requestAnimationFrame(() => {
			callback.apply(scope, args);
			running = false;
		});
	};
	return (...args) => {
		if (!running)
			running = setTimeout(
				onTimeOut,
				Math.max(0, DELAY - FRAME),
				...args
			);
	};
};

/* styles */

const trivetCSS = [
	resetCSS,
	defaultsCSS,
	tokensCSS,
	foundationCSS,
	utilitiesCSS,
];
//export { CSSString2CSSStyleSheet } from './scripts/CSSString2CSSStyleSheet.js';
//export { insertIntoCssLayer } from './scripts/insertIntoCssLayer.js';
//export { generateUUID } from './scripts/generateUUID.js';
//export { injectDocumentStyles } from './scripts/injectDocumentStyles.js';

/* icons */
//export { iconFonts } from './build/icons.js';

export { loadFont, throttler, trivetCSS };
