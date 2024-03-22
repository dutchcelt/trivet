/* Base styles for all Trivet Components */
import { trivetCSS } from '@trvt/assets';

import { createFragment } from './createFragment.js';
import { activateColorScheme, colorScheme } from './activateColorScheme.js';

/**
 * Represents the CSS layer definitions retrieved from the trivetCSS object.
 * Contains the CSS rules with names extracted from the trivetCSS object.
 *
 * @type {string[]}
 * @name cssLayerDefinitions
 */
const cssLayerDefinitions = trivetCSS[0].cssRules[0].nameList;

/**
 * Global CSS Variable Object
 * This object provides a convenient way to manage global CSS variables.
 * @example globalCssVar.style = "--color: rebeccapurple";
 * @example globalCssVar.style = ["--weight: 100;", "--size: 4rem;"];
 *
 * @type {object}
 * @property {CSSStyleRule} cssRule - CSSStyleRule for managing global Custom Properties.
 * @property {(type: string) => void} addProp - add global CSS properties
 * @property {CSSStyleDeclaration} style - Getter/Setter for CSSStyleDeclaration
 */
export const globalCssVar = Object.freeze({
	// Using IIFE to automatically configure a CSSStyleRule.
	cssRule: (css => (
		css.replaceSync(':root{}'),
		document.adoptedStyleSheets.push(css),
		css.cssRules[0] // Comma Operator, last value is returned
	))(new CSSStyleSheet()),
	addProp(prop) {
		const [propName, propValue] = prop.replace(/;|\s/gi, '').split(':');
		/^--/.test(propName)
			? this.style.setProperty(propName, propValue)
			: console.error(`"${propName}" is not a valid Custom Property ident`);
	},
	get style() {
		return this.cssRule.style;
	},
	set style(properties) {
		[properties].flat().forEach(this.addProp.bind(this));
	},
});

/**
 * TrivetElement
 * @class
 */
class TrivetElement extends HTMLElement {
	/**  @type {ShadowRoot} */
	#shadowRoot;

	/**  @type {CSSStyleSheet} */
	// @ts-expect-error
	#shadowStyles;
	/** @type {string} */
	// @ts-expect-error
	#template;

	#render() {
		activateColorScheme(colorScheme.current || '');
		this.#shadowRoot.innerHTML = this.template;
	}

	get shadow() {
		return this.#shadowRoot;
	}

	/**
	 * @returns {HTMLElement|null}
	 */
	get shadowFragment() {
		return this.shadow.querySelector('*');
	}

	/**
	 * Get shadowStyleSheets
	 * @returns {CSSStyleSheet | CSSStyleSheet[]}
	 */
	get shadowStyleSheets() {
		return this.#shadowStyles;
	}

	/**
	 * Set shadowStyleSheets
	 * @param {CSSStyleSheet | CSSStyleSheet[]} styles
	 */
	set shadowStyleSheets(styles) {
		const sheets = [styles].flat();
		for (const ss of sheets) {
			const shadowSheets = this.shadow.adoptedStyleSheets;
			if (!shadowSheets.includes(ss)) {
				this.shadow.adoptedStyleSheets = [...shadowSheets, ss];
			}
		}
	}

	/**
	 * Adds CSS properties to the host element of a shadow DOM.
	 * @param {string[]} propsArray - An array of CSS properties to be added.
	 */
	set hostCssProperties(propsArray) {
		const sheet = new CSSStyleSheet();
		const shadowSheets = this.shadow.adoptedStyleSheets;
		sheet.replaceSync(`:host { ${propsArray.join(';')} }`);
		if (!shadowSheets.includes(sheet)) {
			this.shadow.adoptedStyleSheets = [...shadowSheets, sheet];
		}
	}

	/**
	 * Get template
	 * @type {string}  - Type of template
	 */
	get template() {
		return this.#template;
	}

	/**
	 * @param {string} str - Type of Template
	 */
	set template(str) {
		this.#template = `${createFragment(str, false)}`;
		this.#render();
	}

	constructor() {
		super();
		this.settings = {
			/**  @type {string|any} */
			mode: 'closed',
			/**  @type {boolean} */
			delegatesFocus: true,
		};
		this.#shadowRoot = this.attachShadow(this.settings);
		this.shadowStyleSheets = [...trivetCSS];
	}
}

export { trivetCSS as styles, TrivetElement, cssLayerDefinitions };
