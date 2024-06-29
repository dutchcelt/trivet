// @ts-expect-error
import headerCellCSS from './headerCell.css' with { type: 'css' };
import { styles, TrivetElement } from '@trvt/core';

export class trvtHeaderCell extends TrivetElement {
	#internals;

	static get observedAttributes() {
		return ['rowspan', 'colspan']; // List of attributes you want to observe
	}

	constructor() {
		super();
		this.#internals = this.attachInternals();
		this.#internals.role = 'columnheader';

		this.tableElement = this.closest('trvt-table');
		this.cellEvent = new CustomEvent('cellupdate');

		this.shadowStyleSheets = [...styles, headerCellCSS];
		this.template = `<div><slot></slot></div>`;
		requestAnimationFrame(() => {
			this.shadowCSSvars = [`--trvt-cell-grid-area: ${this.cellName}`];
		});
	}

	attributeChangedCallback(name) {
		if (/rowspan|colspan/gi.test(name)) {
			this.tableElement.dispatchEvent(this.cellEvent);
		}
	}
}
customElements.define('trvt-header-cell', trvtHeaderCell);
