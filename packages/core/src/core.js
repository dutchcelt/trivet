/* Base styles for all Trivet Components */
import { trivetCSS } from '@trvt/styles';
import { activateColorScheme, colorScheme } from './activateColorScheme.js';
import { dynamicStyles, createFragment } from '@trvt/utils';

/** @type {Array<string>} */
// @ts-ignore
const cssLayerDefinitions = [...(trivetCSS?.[0].cssRules?.[0]?.nameList || '')];

/**
 * TrivetElement
 * @class
 * @classdesc The Base Class for all Trivet components
 */
class TrivetElement extends HTMLElement {
	/**  @type {ShadowRoot} */
	#shadowRoot;

	/**  @type {CSSStyleSheet[]} */
	#shadowStyles;

	/** @type {DocumentFragment|String} */
	#template;

	/** @type {object|undefined} */
	#dynamicStyles;

	#render() {
		activateColorScheme(colorScheme.current || '');
		this.#shadowRoot.append(this.template);
		activateColorScheme();
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
				this.shadow.adoptedStyleSheets.push(ss);
			} else {
				//console.warn('Trying to pass an existing stylesheet');
			}
		}
	}

	/**
	 * Sets the CSS custom properties in the shadow DOM.
	 *  @example
	 *  connectedCallback(){
	 * 		this.shadowCSSvars = "--trvt-color: pink";
	 * 	}
	 * @param {object} properties - The properties to be set for the shadow CSS.
	 */
	set shadowCSSvars(properties) {
		if (this.shadow) {
			if (!this.#dynamicStyles) {
				this.#dynamicStyles = dynamicStyles(this.shadow);
				if (CSS.supports('selector(:playing)')) {
					this.style.setProperty(
						'--force-safari-to-invalidate-styles',
						crypto.randomUUID(),
					);
				}
			}
			// @ts-ignore
			this.#dynamicStyles.properties = properties;
		} else {
			console.error(
				`shadowCSSvars: Can't determine the root to place the custom properties in`,
			);
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
	 * Get template as a DocumentFragment
	 * @type {DocumentFragment|String}  - Type of template
	 */
	get template() {
		return this.#template;
	}

	/**
	 * Sets the template for the current object.
	 *
	 * @param {string} str - The type of template to set.
	 */
	set template(str) {
		this.#template = createFragment(str);
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
		this.#shadowStyles = [];
		this.#template = '';
		this.#dynamicStyles = undefined;
		this.shadowStyleSheets = [...trivetCSS];
	}
}

export { trivetCSS as styles, TrivetElement, cssLayerDefinitions };
