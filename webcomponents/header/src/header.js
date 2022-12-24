import { styles } from '@trvt/core';
import headerCSS from './header.css' assert { type: 'css' };

export class TrvtHeader extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.context = this.dataset.trvtContext || '';
		this.imageSource = this.dataset.trvtSrc || '';
		this.titleString = this.dataset.trvtTitle || '';
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
		this.#setStyle();
	}

	static get observedAttributes() {
		return ['data-trvt-src', 'data-trvt-title'];
	}
	/**
	 * @param name
	 * @param oldValue
	 * @param newValue
	 */
	attributeChangedCallback(name, oldValue, newValue) {
		const attributeValue = newValue || oldValue;
		switch (name) {
			case 'data-trvt-gradient':
				this.imageSource = attributeValue || '';
				if (this.gradient) this.#setStyle();
				break;
			case 'data-trvt-src':
				this.imageSource = attributeValue || '';
				if (this.imageSource) this.#setStyle();
				break;
			case 'data-trvt-title':
				this.titleString = attributeValue || '';
				if (this.heading) this.heading.textContent = this.titleString;
				break;
		}
	}

	/**
	 * Add the css prop to an adopted stylesheet
	 * @private
	 */
	#setStyle() {
		const url = this.imageSource
			? ` --header-image-src: url('${encodeURI(this.imageSource)}')`
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
		const heading = this.titleString
			? `<div part="heading">${this.titleString}</div>`
			: ``;
		return document.createRange().createContextualFragment(`${heading}`);
	}
}
customElements.define('trvt-header', TrvtHeader);
