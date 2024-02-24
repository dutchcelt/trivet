import { TrivetElement } from '@trvt/core';
import trvtItemCSS from './li.css' assert { type: 'css' };

export class TrvtLi extends TrivetElement {
	#internals;
	constructor() {
		super();
		this.#internals = this.attachInternals();
		this.#internals.role = 'listitem';

		this.value = this.dataset?.value || undefined;
		this.shadowStyleSheets = [trvtItemCSS];
		if (this.value)
			this.hostCssProperties = ['--counter-value', `${+this.value - 1}`];
		//this.template = `<li class="list-item" role="listitem" value="${this.value}"><slot></slot></li>`;
		this.template = `<slot></slot>`;
	}
}

// @ts-ignore
customElements.define('trvt-li', TrvtLi);
