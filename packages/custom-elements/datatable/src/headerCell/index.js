// @ts-expect-error
import headerCellCSS from './headerCell.css' with { type: 'css' };
import { styles, TrivetElement } from '@trvt/core';

export class trvtHeaderCell extends TrivetElement {
	#internals;
	constructor() {
		super();
		this.#internals = this.attachInternals();
		this.#internals.role = 'columnheader';

		this.shadowStyleSheets = [...styles, headerCellCSS];
		this.template = `<div><slot></slot></div>`;
		requestAnimationFrame(() => {
			this.shadowCSSvars = [`--trvt-cell-grid-area: ${this.cellName}`];
		});
	}
}
customElements.define('trvt-header-cell', trvtHeaderCell);
