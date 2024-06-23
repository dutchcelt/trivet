// @ts-expect-error
import cellCSS from './cell.css' with { type: 'css' };
import { styles, TrivetElement } from '@trvt/core';

export class trvtCell extends TrivetElement {
	#internals;
	constructor() {
		super();
		this.#internals = this.attachInternals();
		this.#internals.role = 'cell';

		this.shadowStyleSheets = [...styles, cellCSS];
		this.template = `<div><slot></slot></div>`;
		requestAnimationFrame(() => {
			this.shadowCSSvars = [`--trvt-cell-grid-area: ${this.cellName}`];
		});
	}
}

customElements.define('trvt-cell', trvtCell);
