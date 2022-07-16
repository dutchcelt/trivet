import { styles } from '@trvt/core';
import headerCSS from './header.css' assert { type: 'css' };

export class TrvtHeader extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.src = this.dataset.trvtSrc || '';
		this.type = this.dataset.trvtType || 'home';
		this.text = this.dataset.trvtTitle || '';
		this.size = this.dataset.trvtSize || 'l';
		this.gradient = this.dataset.trvtGradient || '';
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
			case 'data-trvt-gradient':
				this.src = attributeValue || '';
				if (this.gradient) this.__setStyle();
				break;
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
	 * Add the css prop to an adopted stylesheet
	 * @private
	 */
	__setStyle() {
		const url = this.src
			? ` --header-image-src: url('${encodeURI(this.src)}'),`
			: '';
		const gradient = this.gradient
			? `--header-gradient: ${this.gradient};`
			: '';
		const rule = `:host(:where(trvt-header)) { ${url} ${gradient}; }`;
		this.dynamicCustomStyles.replace(rule);
	}

	/**
	 * Create a <H1> element
	 * @returns {DocumentFragment}
	 */
	render() {
		const heading = this.text
			? `<div part="heading">${this.text}</div>`
			: ``;
		return document.createRange().createContextualFragment(`${heading}`);
	}
}
customElements.define('trvt-header', TrvtHeader);
