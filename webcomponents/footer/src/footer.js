import { styles } from '@trvt/core';

export class TrvtFooter extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.adoptedStyleSheets = [...styles];
		this.shadowRoot.innerHTML = `<slot></slot>`;
	}
}
customElements.define('trvt-footer', TrvtFooter);
