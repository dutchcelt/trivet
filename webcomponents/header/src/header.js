import { styles } from '@trvt/core';
import headerCSS from './header.css' assert { type: 'css' };

export class TrvtHeader extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.src = this.dataset.trvtSrc || '';
		this.type = this.dataset.trvtType || 'home';
		this.text = this.dataset.trvtTitle || '';
		this.dynamicCustomStyles = new CSSStyleSheet();
	}

	connectedCallback() {
		this.shadowRoot.adoptedStyleSheets = [
			...styles,
			headerCSS,
			this.dynamicCustomStyles,
		];
		this.heading = this.shadowRoot.querySelector('h1');
		this.shadowRoot.appendChild(this.render());
		this.__setStyle();
	}

	static get observedAttributes() {
		return ['data-trvt-src', 'data-trvt-title'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		const attributeValue = newValue || oldValue;
		switch (name) {
			case 'data-trvt-src':
				this.src = attributeValue || '';
				if (this.src) this.__setStyle();
				break;
			case 'data-trvt-title':
				this.text = attributeValue || '';
				if (this.heading) this.heading.textContent = this.text;
				break;
		}
	}

	/**
	 *
	 * @private
	 */
	__setStyle() {
		const src = encodeURI(this.src);
		const rule = `:host { --header-image-src: url('${src}'); }`;
		this.dynamicCustomStyles.replace(rule);
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
