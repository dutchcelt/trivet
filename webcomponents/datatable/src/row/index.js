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
		const parentElement = this.parentElement;
		const children = parentElement ? parentElement.children : [];
		this.rowNumber = [...children].indexOf(this) + 1;
		this.style.setProperty('--trvt-row-number', `${this.rowNumber}`);
	}
}

customElements.define('trvt-row', trvtRow);
