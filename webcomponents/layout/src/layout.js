import { styles } from '@trvt/core';
import layoutCSS from './layout.css' assert { type: 'css' };

export class TrvtLayout extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.adoptedStyleSheets = [...styles, layoutCSS];
	}
	connectedCallback() {
		this.shadowRoot.appendChild(this.render());
	}
	render() {
		return document.createRange().createContextualFragment(`
			<slot name="navigation"></slot>
			<slot name="header"></slot>
			<slot name="main"></slot>
			<slot name="sidebar"></slot>
			<slot name="footer"></slot>
		`);
	}
}
customElements.define('trvt-layout', TrvtLayout);
