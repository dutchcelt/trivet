import { styles } from '@trvt/core';

export class TrvtNavigation extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.adoptedStyleSheets = [...styles];
		this.shadowRoot.innerHTML = `<slot></slot>`;
	}
}
customElements.define('trvt-navigation', TrvtNavigation);
