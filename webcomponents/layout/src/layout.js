import { styles, contentLoadedMachine } from '@trvt/core';
import layoutCSS from './layout.css' assert { type: 'css' };

/**
 *
 * @param elms
 * @returns {string[]}
 * @private
 */
const __getSlotNames = (elms) => [...elms]
		.filter(n => n.hasAttribute('slot'))
		.map(e => e.getAttribute('slot'));


export class TrvtLayout extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.slotNames = __getSlotNames(this.children);
	}

	connectedCallback() {
		this.shadowRoot.adoptedStyleSheets = [...styles, layoutCSS];
		this.shadowRoot.appendChild(this.render());
		contentLoadedMachine.transition('loading', 'READY')
	}

	/**
	 *
	 * @returns {DocumentFragment}
	 */
	render() {
		const type = this.shadowRoot.host.getAttribute('type');
		return document.createRange().createContextualFragment(`
			${!!type ? this.__template() : ``}
		`);
	}

	/**
	 *
	 * @returns {string}
	 * @private
	 */
	__template() {
		return this.slotNames.map(name => this.__slotMarkupObject()[name] || ``).join(``);
	}

	/**
	 *
	 * @returns {{navigation: string, footer: string, sidebar: string, header: string, main: string}}
	 * @private
	 */
	__slotMarkupObject() {
		return {
			"navigation": `<div class="navigation"><slot name="navigation"></slot></div>`,
			"header":`<div class="header"><slot name="header"></slot></div>`,
			"main":`<div class="main"><slot name="main"></slot></div>`,
			"sidebar":`<div class="sidebar"><slot name="sidebar"></slot></div>`,
			"footer":`<div class="footer"><slot name="footer"></slot></div>`
		}
	}
}
customElements.define('trvt-layout', TrvtLayout);
