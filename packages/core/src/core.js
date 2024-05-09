/* Base styles for all Trivet Components */
import { trivetCSS } from '@trvt/styles';

import { createFragment } from './createFragment.js';
import { activateColorScheme, colorScheme } from './activateColorScheme.js';

/**
 * Represents the CSS layer definitions.
 *
 * @type {Array<string>}
 * @name cssLayerDefinitions
 * @memberOf trivetCSS
 * @property {CSSRule} cssLayerDefinitions[0] - The first CSS rule in the trivetCSS array.
 * @property {CSSStyleRule} cssLayerDefinitions[0].cssRules[0] - The first CSS style rule in the first CSS rule.
 * @property {DOMTokenList} cssLayerDefinitions[0].cssRules[0].nameList - The name list associated with the first CSS style rule.
 */
// @ts-ignore
const cssLayerDefinitions = trivetCSS[0].cssRules[0].nameList;

/**
 * TrivetElement
 * @class
 @property {Array} nameList
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
