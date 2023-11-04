import rowCSS from './row.css' assert { type: 'css' };
import { styles } from '@trvt/core';

export class trvtRow extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.setAttribute('role', 'row');
		this.shadowRoot.adoptedStyleSheets = [...styles, rowCSS];
		this.shadowRoot.innerHTML = `<slot></slot>`;
	}
	connectedCallback() {
		try {
			if (CSS.supports('grid-template-columns', 'subgrid')) {
				this.rowNumber = [...this.parentElement.children].indexOf(this) + 1;
			} else {
				const table = this.closest('trvt-table');
				this.rowNumber = [...table.rowElements].indexOf(this) + 1;
			}
			this.style.setProperty('--trvt-row-number', this.rowNumber);
		} catch (error) {
			console.log(error);
		}
	}
}
customElements.define('trvt-row', trvtRow);
