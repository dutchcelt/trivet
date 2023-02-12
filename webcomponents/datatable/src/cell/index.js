import cellCSS from './cell.css' assert { type: 'css' };
import { styles } from '@trvt/core';

export class trvtCell extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.setAttribute('role', 'cell');
		this.shadowRoot.adoptedStyleSheets = [...styles, cellCSS];
		this.shadowRoot.innerHTML = `
			<div><slot></slot></div>
		`;

		this.colspan = this.getAttribute('colspan') || 1;
		this.rowspan = this.getAttribute('rowspan') || 1;
		this.colstart = this.getAttribute('colstart') || 'auto';

		this.style.setProperty('--trvt-cell-row-span', this.rowspan);
		this.style.setProperty('--trvt-cell-col-span', this.colspan);
		this.style.setProperty('--trvt-cell-col-start', this.colstart);
	}
	connectedCallback() {}
}
customElements.define('trvt-cell', trvtCell);
