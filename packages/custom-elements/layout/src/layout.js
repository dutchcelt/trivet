import { TrivetElement } from '@trvt/core';
import layoutCSS from './layout.css' with { type: 'css' };

/**
 * @typedef {{navigation: string, footer: string, sidebar: string, header: string, main: string, notifications: string}} SlotsObject
 */

/**
 * Lookup of the slots called in the Light DOM
 * @param elms
 * @returns {string[]}
 * @private
 */

/**
 * Returns an array of slot names for the given elements.
 * @param {HTMLElement[]} elms - The list of elements to retrieve slot names from.
 * @returns {(string|null)[]}
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

/**
 * Returns a new array of slot names from the provided control array, preserving the order
 * in which the slot names appear in the slots array.
 *
 * @param {string[]} control - The array of slot names to be filtered.
 * @param {(string|null)[]} slots - The array of slot names to be used for filtering.
 */
const __sortSlotNames = (control, slots) =>
	control.filter(c => slots.some(s => s === c));

export class TrvtLayout extends TrivetElement {
	constructor() {
		super();
		this.slotNames = __sortSlotNames(
			Object.keys(this.#slotMarkupObject()),
			// @ts-expect-error
			__getSlotNames(this.children),
		);
		this.type = this.dataset?.type || 'page';
		this.collapsed = this.dataset?.collapse;
		this.position = this.dataset?.contentPosition || 'start';
		this.shadowStyleSheets = layoutCSS;
		this.shadow.innerHTML = `<div class="trvt-layout"></div>`;
		this.#render(this.shadowFragment);
	}

	/**
	 * Get the main (ie default) slot or if not available the first available slot.
	 * @param {string} name
	 * @returns {Element|null}
	 */
	#defaultSlot(name = 'main') {
		const slotAttribute = this.slotNames.includes(name)
			? `[name=${name}]`
			: '[name]';
		return this.shadow.querySelector(`slot${slotAttribute}`);
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
	 * Returns a concatenated string of slot markup objects.
	 *
	 * @returns {string} The concatenated string containing the slot markup objects.
	 */
	#template() {
		const templates = this.#slotMarkupObject();
		/** @type {string[]} */
		return (
			this.slotNames
				// @ts-expect-error
				.map(name => templates[name] || ``)
				.join(``)
		);
	}

	/**
	 * Each slot has a wrapper to avoid styling the slots directly.
	 * @returns {SlotsObject}
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
