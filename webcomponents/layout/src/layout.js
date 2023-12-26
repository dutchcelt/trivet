import { TrivetElement } from '@trvt/core';
import layoutCSS from './layout.css' assert { type: 'css' };

/**
 * Lookup of the slots called in the Light DOM
 * @param elms
 * @returns {string[]}
 * @private
 */
const __getSlotNames = elms =>
	[...elms]
		.filter(n => n.hasAttribute('slot'))
		.map(e => e.getAttribute('slot'));

/**
 * Prevent the Light DOM from setting the order of the slots
 * @param control
 * @param slots
 * @returns {*}
 * @private
 */
const __sortSlotNames = (control, slots) =>
	control.filter(c => slots.some(s => s === c));

export class TrvtLayout extends TrivetElement {
	constructor() {
		super();

		this.slotNames = __sortSlotNames(
			Object.keys(this.#slotMarkupObject()),
			__getSlotNames(this.children)
		);
		this.type = this.dataset?.type || 'page';
		this.collapsed = this.dataset?.collapse;
		this.position = this.dataset?.contentPosition || 'start';
		this.shadowStyleSheets = layoutCSS;
		this.shadow.innerHTML = `<div class="trvt-layout"></div>`;
		this.#render(this.shadowFragment);
	}

	connectedCallback() {}

	/**
	 * Get the main (ie default) slot or if not available the first available slot.
	 * @param {string} name
	 * @returns {Element}
	 */
	#defaultSlot(name = 'main') {
		const slotAttribute = this.slotNames.includes(name)
			? `[name=${name}]`
			: '[name]';
		return this.shadowRoot.querySelector(`slot${slotAttribute}`);
	}

	/**
	 * Render out the slots template to the custom element
	 * @param {HTMLElement} element
	 */
	#render(element) {
		if (element) {
			element.classList.add(this.type, this.position);
			element.innerHTML = this.slotNames.length
				? this.#template()
				: `<slot></slot>`;
		}
	}

	/**
	 * Assemble the slots called from the markup
	 * @returns {string}
	 */
	#template() {
		return this.slotNames
			.map(name => this.#slotMarkupObject()[name] || ``)
			.join(``);
	}

	/**
	 * Each slot has a wrapper to avoid styling the slots directly.
	 * @returns {{navigation: string, footer: string, sidebar: string, header: string, main: string, notifications: string}}
	 */
	#slotMarkupObject() {
		return {
			notifications: `<div class="notifications"><slot name="notifications"></slot></div>`,
			navigation: `<nav class="navigation"><slot name="navigation"></slot></nav>`,
			header: `<div class="header"><slot name="header"></slot></div>`,
			main: `<div class="main content"><slot name="main"></slot></div>`,
			sidebar: `<div class="sidebar content"><slot name="sidebar"></slot></div>`,
			footer: `<div class="footer"><slot name="footer"></slot></div>`,
		};
	}
}

customElements.define('trvt-layout', TrvtLayout);
