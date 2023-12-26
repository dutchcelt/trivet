import { styles as t, createFragment as e } from '@trvt/core';
import s from './styles-629028ff.css' assert { type: 'css' };
class i extends HTMLElement {
	constructor() {
		super(),
			this.attachShadow({ mode: 'open' }),
			(this.context = this.dataset.trvtContext || ''),
			(this.imageSource = this.dataset.trvtSrc || ''),
			(this.titleString = this.dataset.trvtTitle || ''),
			(this.size = this.dataset.trvtSize || 'l'),
			(this.gradient = this.dataset.trvtGradient || ''),
			(this.dynamicCustomStyles = new CSSStyleSheet());
	}
	connectedCallback() {
		(this.shadowRoot.adoptedStyleSheets = [...t, s, this.dynamicCustomStyles]),
			(this.heading = this.shadowRoot.querySelector('h1')),
			this.shadowRoot.appendChild(this.render()),
			this.#t();
	}
	static get observedAttributes() {
		return ['data-trvt-src', 'data-trvt-title'];
	}
	attributeChangedCallback(t, e, s) {
		const i = s || e;
		switch (t) {
			case 'data-trvt-gradient':
				(this.imageSource = i || ''), this.gradient && this.#t();
				break;
			case 'data-trvt-src':
				(this.imageSource = i || ''), this.imageSource && this.#t();
				break;
			case 'data-trvt-title':
				(this.titleString = i || ''),
					this.heading && (this.heading.textContent = this.titleString);
		}
	}
	#t() {
		const t = `:host(:where(trvt-header)) { ${
			this.imageSource
				? ` --header-image-src: url('${encodeURI(this.imageSource)}')`
				: ''
		} ${this.gradient ? `--header-gradient: ${this.gradient};` : ''}; }`;
		this.dynamicCustomStyles.replace(t);
	}
	render() {
		const t = this.titleString
			? `<div part="heading">${this.titleString}</div>`
			: '';
		return e(`${t}`);
	}
}
customElements.define('trvt-header', i);
export { i as TrvtHeader };
