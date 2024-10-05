// @ts-expect-error
import rowCSS from './row.css' with { type: 'css' };
import { styles, TrivetElement } from '@trvt/core';

export class trvtRow extends TrivetElement {
	#internals;
	constructor() {
		super();
		this.#internals = this.attachInternals();
		this.#internals.role = 'row';

		this.shadowStyleSheets = [...styles, rowCSS];
		this.template = `<slot></slot>`;
	}

	connectedCallback() {
		const parentElement = this.parentElement;
		const children = parentElement ? parentElement.children : [];
		this.rowNumber = [...children].indexOf(this) + 1;
		this.shadowCSSvars = [`--trvt-row-number:${this.rowNumber};`];
	}
}

customElements.define('trvt-row', trvtRow);
