import rowCSS from './row.css' assert { type: 'css' };
import { styles, TrivetElement } from '@trvt/core';

export class trvtRow extends TrivetElement {
	constructor() {
		super();
		this.setAttribute('role', 'row');
		this.shadowStyleSheets = [...styles, rowCSS];

		this.template = `<slot></slot>`;
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
