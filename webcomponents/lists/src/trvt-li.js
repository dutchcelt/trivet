import { styles } from '@trvt/core';
import trvtItemCSS from './trvt-li.css' assert { type: 'css' };

export class TrvtLi extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.adoptedStyleSheets = [...styles, trvtItemCSS];
		this.value = this.dataset?.value;
		if (!CSS.supports('grid-template-columns', 'subgrid')) {
			this.shadowRoot.innerHTML = `<li class="list-item" value="${this.value}"><slot></slot></li>`;
		} else {
			if (this.value) {
				this.style.setProperty('--counter-value', `${this.value - 1}`);
			}
			this.setAttribute('role', 'listitem');
			this.shadowRoot.innerHTML = `<div class="list-item"><slot></slot></div>`;
		}
	}
}
customElements.define('trvt-li', TrvtLi);
