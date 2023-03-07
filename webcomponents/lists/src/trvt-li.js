import { styles } from '@trvt/core';
import trvtItemCSS from './trvt-li.css' assert { type: 'css' };

export class TrvtLi extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.adoptedStyleSheets = [...styles, trvtItemCSS];
		this.setAttribute('role', 'listitem');
		if ((this.value = this.dataset?.value)) {
			this.style.setProperty('--counter-value', `${this.value - 1}`);
		}
		this.shadowRoot.innerHTML = `<div class="list-item"><slot></slot></div>`;
	}
}
customElements.define('trvt-li', TrvtLi);
