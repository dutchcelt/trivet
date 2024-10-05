// @ts-expect-error
import rowgroupCSS from './rowGroup.css' with { type: 'css' };
import { styles, TrivetElement } from '@trvt/core';

export class trvtRowGroup extends TrivetElement {
	#internals;
	constructor() {
		super();
		this.#internals = this.attachInternals();
		this.#internals.role = 'rowgroup';

		this.shadowCSSvars = [
			`--trvt-row-length:${this.children.length.toString()};`,
		];

		this.shadowStyleSheets = [...styles, rowgroupCSS];

		this.template = `<slot></slot>`;
	}
}
