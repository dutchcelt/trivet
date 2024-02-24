/* Base styles for all Trivet Components */
import { trivetCSS } from '@trvt/assets';

import { createFragment } from './createFragment.js';
import { activateColorScheme, colorScheme } from './activateColorScheme.js';

/**
 * cssLayerDefinitions
 * @type {Array}
 */
const cssLayerDefinitions = trivetCSS[0].cssRules[0].nameList;

/**
 * TrivetElement
 * @class
 * @extends {HTMLElement}
 */
class TrivetElement extends HTMLElement {
	/**  @type {ShadowRoot} */
	#shadowRoot;
	/**  @type {CSSStyleSheet} */
	#shadowStyles;
	/** @type {String} */
	#template;

	#render() {
		activateColorScheme(colorScheme.current);
		this.#shadowRoot.innerHTML = this.template;
	}

	get shadow() {
		return this.#shadowRoot;
	}

	/**
	 * @returns {HTMLElement}
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
		this.#template = undefined;
	}
}

export { trivetCSS as styles, TrivetElement, cssLayerDefinitions };
