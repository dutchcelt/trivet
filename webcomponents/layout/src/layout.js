import { styles, contentLoadedMachine } from '@trvt/core';
import layoutCSS from './layout.css' assert { type: 'css' };

export class TrvtLayout extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.shadowRoot.adoptedStyleSheets = [...styles, layoutCSS];
		this.shadowRoot.appendChild(this.render());
		contentLoadedMachine.transition('loading', 'READY')
	}
	render() {
		const type = this.shadowRoot.host.getAttribute('type');
		return document.createRange().createContextualFragment(`
			${!!type ? this.__template() : ``}
		`);
	}
	__template() {
		return `
			<slot name="navigation"></slot>
			<slot name="header"></slot>
			<slot name="main"></slot>
			<slot name="sidebar"></slot>
			<slot name="footer"></slot>
		`;
	}
}
customElements.define('trvt-layout', TrvtLayout);
