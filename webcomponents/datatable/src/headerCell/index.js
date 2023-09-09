import headerCellCSS from './headerCell.css' assert { type: 'css' };
import { styles } from '@trvt/core';

export class trvtHeaderCell extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.setAttribute('role', 'columnheader');
		this.shadowRoot.adoptedStyleSheets = [...styles, headerCellCSS];

		this.colspan = this.getAttribute('colspan') || 1;
		this.rowspan = this.getAttribute('rowspan') || 1;
		this.colstart = this.getAttribute('colstart') || 'auto';
		this.style.setProperty('--trvt-cell-row-span', this.rowspan);
		this.style.setProperty('--trvt-cell-col-span', this.colspan);
		this.style.setProperty('--trvt-cell-col-start', this.colstart);

		this.shadowRoot.innerHTML = `<div><slot></slot></div>`;
	}
}
customElements.define('trvt-header-cell', trvtHeaderCell);
