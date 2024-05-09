import { styles, createFragment } from '@trvt/core';
// @ts-expect-error
import headerCSS from './header.css' with { type: 'css' };

export class TrvtHeader extends HTMLElement {
	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: 'open' });
		this.context = this.dataset.trvtContext || '';
		this.imageSource = this.dataset.trvtSrc || '';
		this.titleString = this.dataset.trvtTitle || '';
		this.size = this.dataset.trvtSize || 'l';
		this.gradient = this.dataset.trvtGradient || '';
		/* @type {CSSStyleSheet} */
		this.dynamicCustomStyles = new CSSStyleSheet();
	}

	connectedCallback() {
		this.shadow.adoptedStyleSheets = [
			...styles,
			headerCSS,
			this.dynamicCustomStyles,
		];
		this.heading = this.shadow.querySelector('h1');
		// @ts-expect-error
		this.shadow.appendChild(this.render());
		this.#setStyle();
	}

	static get observedAttributes() {
		return ['data-trvt-src', 'data-trvt-title'];
	}
	/**
	 * Method to handle attribute changes in the custom element.
	 *
	 * @param {string} name - The name of the attribute that has changed.
	 * @param {any} oldValue - The previous value of the attribute.
	 * @param {any} newValue - The new value of the attribute.
	 * @returns {void}
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
	 */
	async #setStyle() {
		const url = this.imageSource
			? ` --header-image-src: url('${encodeURI(this.imageSource)}')`
			: '';
		const gradient = this.gradient
			? `--header-gradient: ${this.gradient};`
			: '';
		const rule = `:host(:where(trvt-header)) { ${url} ${gradient}; }`;
		await this.dynamicCustomStyles.replace(rule);
	}

	/**
	 * Renders a <H1> element with an optional title.
	 * @returns {DocumentFragment|string} - The created document fragment.
	 */
	render() {
		const heading = this.titleString
			? `<div part="heading">${this.titleString}</div>`
			: ``;
		return createFragment(`${heading}`);
	}
}
customElements.define('trvt-header', TrvtHeader);
