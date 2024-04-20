import cellCSS from './cell.css' with { type: 'css' };
import { styles, TrivetElement } from '@trvt/core';

export class trvtCell extends TrivetElement {
	constructor() {
		super();
		this.setAttribute('role', 'cell');
		this.shadowStyleSheets = [...styles, cellCSS];

		this.template = `
			<div><slot></slot></div>
		`;

		this.colspan = this.getAttribute('colspan') || '1';
		this.rowspan = this.getAttribute('rowspan') || '1';
		this.colstart = this.getAttribute('colstart') || 'auto';

		this.style.setProperty('--trvt-cell-row-span', this.rowspan);
		this.style.setProperty('--trvt-cell-col-span', this.colspan);
		this.style.setProperty('--trvt-cell-col-start', this.colstart);
	}
	connectedCallback() {}
}
customElements.define('trvt-cell', trvtCell);
