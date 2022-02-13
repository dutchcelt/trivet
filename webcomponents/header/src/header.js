import { styles } from '@trvt/core';
import headerCSS from './header.css' assert { type: 'css' };

export class TrvtHeader extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}
	connectedCallback() {
		this.shadowRoot.adoptedStyleSheets = [...styles, headerCSS];
		this.shadowRoot.appendChild(this.render());
	}
	render() {
		this.style = `--header-image-src:url("${this.dataset.imageSrc}");`;
		return document.createRange().createContextualFragment(`
			<h1><slot name="heading"></slot></h1>
		`);
	}
}
customElements.define('trvt-header', TrvtHeader);
