import { styles } from '@trvt/core';
import headerCSS from './header.css' assert { type: 'css' };

export class TrvtHeader extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.src = this.dataset.trvtSrc;
	}
	connectedCallback() {
		this.shadowRoot.adoptedStyleSheets = [...styles, headerCSS];
		this.shadowRoot.appendChild(this.render());
		this.setStyle();
	}

	static get observedAttributes() {
		return ['data-trvt-src'];
	}
	attributeChangedCallback() {
		this.src = this.dataset.trvtSrc;
		this.setStyle();
	}
	setStyle() {
		this.style = `--header-image-src:url("${this.src}");`;
	}
	render() {
		return document.createRange().createContextualFragment(`
			<h1><slot name="heading"></slot></h1>
		`);
	}
}
customElements.define('trvt-header', TrvtHeader);
