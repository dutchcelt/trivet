import headerCellCSS from './headerCell.css' assert { type: 'css' };
import { styles, TrivetElement } from '@trvt/core';

export class trvtHeaderCell extends TrivetElement {
	constructor() {
		super();
		this.setAttribute('role', 'columnheader');
		this.shadowStyleSheets = [...styles, headerCellCSS];

		this.colspan = this.getAttribute('colspan') || 1;
		this.rowspan = this.getAttribute('rowspan') || 1;
		this.colstart = this.getAttribute('colstart') || 'auto';
		this.style.setProperty('--trvt-cell-row-span', this.rowspan);
		this.style.setProperty('--trvt-cell-col-span', this.colspan);
		this.style.setProperty('--trvt-cell-col-start', this.colstart);

		this.template = `<div><slot></slot></div>`;
	}
}
customElements.define('trvt-header-cell', trvtHeaderCell);
