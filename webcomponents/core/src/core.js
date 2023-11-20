/* Base styles for all Trivet Components */
import { trivetCSS } from '@trvt/assets';

import { createFragment } from './createFragment.js';

const colorScheme = {
	dark: window.matchMedia('(prefers-color-scheme: dark)'),
	light: window.matchMedia('(prefers-color-scheme: light)'),
	_active: undefined,
	get current() {
		return colorScheme._active || colorScheme.light.matches ? 'light' : 'dark';
	},
	set current(mode) {
		colorScheme._active = mode;
	},
};
colorScheme.dark.addEventListener(
	'change',
	e => e.matches && activateColorScheme({ mode: 'dark' })
);
colorScheme.light.addEventListener(
	'change',
	e => e.matches && activateColorScheme({ mode: 'light' })
);

function activateColorScheme({ mode }) {
	if (
		!document.documentElement.dataset.colorScheme ||
		colorScheme.current !== mode
	) {
		document.documentElement.dataset.colorScheme = mode;
	}
}

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
		activateColorScheme({ mode: colorScheme.current });
		this.#shadowRoot.innerHTML = this.template;
	}

	get shadow() {
		return this.#shadowRoot;
	}
	/**
	 * @returns {HTMLElement}
	 */
	get shadowFragment() {
		return this.#shadowRoot.querySelector('*');
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
		this.#shadowRoot.adoptedStyleSheets.push(...sheets);
	}

	/**
	 * Get template
	 * @type {String}  - Type of template
	 */
	get template() {
		return this.#template;
	}
	/**
	 * @param {String} str - Type of Template
	 */
	set template(str) {
		this.#template = `${createFragment(str, false)}`;
		this.#render();
	}

	constructor() {
		super();

		this.settings = {
			/**  @type {String|any} */
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
