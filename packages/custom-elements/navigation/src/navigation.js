import { styles } from '@trvt/core';

export class TrvtNavigation extends HTMLElement {
	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: 'open' });
		this.shadow.adoptedStyleSheets = [...styles];
		this.shadow.adoptedStyleSheets = [...styles];
		this.shadow.innerHTML = `<slot></slot>`;
	}
}
customElements.define('trvt-navigation', TrvtNavigation);
