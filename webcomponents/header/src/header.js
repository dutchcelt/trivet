import { styles } from '@trvt/core';
import headerCSS from './header.css' assert { type: 'css' };

export class TrvtHeader extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.src = this.dataset.trvtSrc || '';
		this.type = this.dataset.trvtType || 'home';
		this.text = this.dataset.trvtTitle || '';
	}
	connectedCallback() {
		this.shadowRoot.adoptedStyleSheets = [...styles, headerCSS];
		this.shadowRoot.appendChild(this.render());
		this.heading = this.shadowRoot.querySelector('h1');
		this.__setStyle();
	}

	static get observedAttributes() {
		return ['data-trvt-src','data-trvt-title'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		const attributeValue = newValue || oldValue;
		switch (name){
			case 'data-trvt-src':
				this.src = attributeValue || '';
				this.__setStyle();
				break;
			case 'data-trvt-title':
				this.text = attributeValue || '';
				this.heading.textContent = this.text;
				break;
		}
	}

	/**
	 *
	 * @private
	 */
	__setStyle() {
		const src = encodeURI(this.src);
		this.style = `--header-image-src:url("${src}");`;
	}

	/**
	 *
	 * @returns {DocumentFragment}
	 */
	render() {
		const heading = this.text ? `<h1>${this.text}</h1>` : ``;
		return document.createRange().createContextualFragment(`${heading}`);
	}
}
customElements.define('trvt-header', TrvtHeader);
