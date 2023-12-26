import { styles as t } from '@trvt/core';
class o extends HTMLElement {
	constructor() {
		super(),
			this.attachShadow({ mode: 'open' }),
			(this.shadowRoot.adoptedStyleSheets = [...t]),
			(this.shadowRoot.innerHTML = '<slot></slot>');
	}
}
customElements.define('trvt-navigation', o);
export { o as TrvtNavigation };
