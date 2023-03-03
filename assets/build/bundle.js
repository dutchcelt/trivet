import layersCSS from './styles-1714a140.css' assert { type: 'css' };
import resetCSS from './styles-e4c0806b.css' assert { type: 'css' };
import defaultsCSS from './styles-344b213f.css' assert { type: 'css' };
import tokensCSS from './styles-0d39a441.css' assert { type: 'css' };
import foundationCSS from './styles-269c8265.css' assert { type: 'css' };
import utilitiesCSS from './styles-284212f6.css' assert { type: 'css' };
import iconFace from './styles-6a83ed61.css' assert { type: 'css' };
import glyphs from './styles-d9bfee46.css' assert { type: 'css' };
import classes from './styles-f31ac684.css' assert { type: 'css' };

/**
 * Detect support CSS at-rule for layers
 * @returns {boolean}
 */
const hasCSSLayerSupport = () => {
	const stylesheet = new CSSStyleSheet();
	const layer = 'test';
	const rule = `@layer ${layer} { 
		:host { color: inherit }
	}`;
	try {
		stylesheet.insertRule(rule, 0);
		return true;
	} catch (e) {
		console.warn('Does not have layers');
		return false;
	}
};

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

/**
 * Convert a CSS String (CSSText) to a stylesheet.
 * This enables the use of constructed stylesheets
 * @param css
 * @returns {CSSStyleSheet}
 * @constructor
 */
const CSSString2CSSStyleSheet = ( css ) => {
	const style = document.createElement ( 'style' );
	style.innerText = css;
	document.head.appendChild ( style );
	const {sheet} = style;
	document.head.removeChild ( style );
	console.log(sheet);
	return sheet;
};

/**
 * External stylesheet often to not a layers. This allows us wrap that sheet in at-rule layer.
 * @param sheets
 * @param layer
 */
const insertIntoCssLayer = (sheets, layer) => {
	if (hasCSSLayerSupport()) {
		return sheets.forEach((sheet) => {
			let cssText = [...sheet.cssRules].reduce(
				(acc, rule) => (acc += rule.cssText),
				''
			);
			sheet.replace(`
			@layer ${layer} {
				${cssText}
			}`);
		});
	}
};

const generateUUID = () => {
	function ff(s) {
		var pt = (Math.random().toString(16)+"000000000").substr(2,8);
		return s ? "-" + pt.substr(0,4) + "-" + pt.substr(4,4) : pt ;
	}
	return ff() + ff(true) + ff(true) + ff();
};

const injectDocumentStyles = (styleSheetArray, tag='unknown') => {
	styleSheetArray.forEach(async (styles) => {
		let styleSheet;
		try {
			styleSheet = new CSSStyleSheet();
			await styleSheet.replace(styles);
			document.adoptedStyleSheets = styleSheet;
		} catch (err) {
			// This method is slower, but works in all browsers.
			styleSheet = document.createElement('style');
			styleSheet.id=`${tag}`;
			styleSheet.textContent = styles;
			document.head.appendChild(styleSheet);
		}
	});
};

/* styles */

const trivetCSS = [
	layersCSS,
	resetCSS,
	defaultsCSS,
	tokensCSS,
	foundationCSS,
	utilitiesCSS,
];
const iconFonts = [iconFace, glyphs, classes];

export { CSSString2CSSStyleSheet, generateUUID, hasCSSLayerSupport, iconFonts, injectDocumentStyles, insertIntoCssLayer, loadFont, throttler, trivetCSS };
