import { styles, dataBus } from '@trvt/core';
import layoutCSS from './layout.css' assert { type: 'css' };

/**
 * Lookup of the slots called in the Light DOM
 * @param elms
 * @returns {string[]}
 * @private
 */
const __getSlotNames = (elms) =>
	[...elms]
		.filter((n) => n.hasAttribute('slot'))
		.map((e) => e.getAttribute('slot'));

/**
 * Prevent the Light DOM from setting the order of the slots
 * @param control
 * @param slots
 * @returns {*}
 * @private
 */
const __sortSlotNames = (control, slots) =>
	control.filter((c) => slots.some((s) => s === c));

export class TrvtLayout extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.trvtType = this.dataset.trvtType;
		this.slotNames = __sortSlotNames(
			Object.keys(this.#slotMarkupObject()),
			__getSlotNames(this.children)
		);
	}

	connectedCallback() {
		if (this.slotNames.length === 0) {
			// No slots, no content!
			console.warn("trvt-layout doesn't have any slots");
			return false;
		}
		this.shadowRoot.adoptedStyleSheets = [...styles, layoutCSS];
		this.shadowRoot.appendChild(this.render());
		this.#defaultSlot().addEventListener('slotchange', () => {
			dataBus.fire('trvtLayout', { type: this.trvtType });
			dataBus.fire('componentLoaded', { loaded: true });
		});
	}

	/**
	 * Get the main (ie default) slot or if not available the first available slot.
	 * @returns {Element}
	 * @private
	 */
	#defaultSlot(name = 'main') {
		const slotAttribute = this.slotNames.includes(name)
			? `[name=${name}]`
			: '[name]';
		return this.shadowRoot.querySelector(`slot${slotAttribute}`);
	}

	/**
	 * Render out the slots template to the custom element
	 * @returns {DocumentFragment}
	 */
	render() {
		return document.createRange().createContextualFragment(`
			<div class="trvt-layout">${!!this.trvtType ? this.#template() : ``}</div>
		`);
	}

	/**
	 * Assemble the slots called from the markup
	 * @returns {string}
	 * @private
	 */
	#template() {
		return this.slotNames
			.map((name) => this.#slotMarkupObject()[name] || ``)
			.join(``);
	}

	/**
	 * Each slot has a wrapper to avoid styling the slots directly.
	 * @returns {{navigation: string, footer: string, sidebar: string, header: string, main: string, notifications: string}}
	 * @private
	 */
	#slotMarkupObject() {
		return Object.freeze({
			notifications: `<div class="notifications"><slot name="notifications"></slot></div>`,
			navigation: `<div class="navigation"><slot name="navigation"></slot></div>`,
			header: `<div class="header"><slot name="header"></slot></div>`,
			main: `<div class="main"><slot name="main"></slot></div>`,
			sidebar: `<div class="sidebar"><slot name="sidebar"></slot></div>`,
			footer: `<div class="footer"><slot name="footer"></slot></div>`,
		});
	}
}

customElements.define('trvt-layout', TrvtLayout);
