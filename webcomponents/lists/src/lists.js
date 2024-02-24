import { TrivetElement } from '@trvt/core';
import trvtListCSS from './list.css' assert { type: 'css' };

export class TrvtOl extends TrivetElement {
	constructor() {
		super();
		this.start = this.dataset?.start || 1;
		this.shadowStyleSheets = trvtListCSS;
		this.template = `<ol role="list" start=${this.start}><slot></slot></ol>`;
	}
}

// @ts-ignore
customElements.define('trvt-ol', TrvtOl);

export class TrvtUl extends TrivetElement {
	#internals;
	constructor() {
		super();
		this.#internals = this.attachInternals();
		this.#internals.role = 'list';

		this.shadowStyleSheets = [trvtListCSS];
		this.hostCssProperties = [`--ul-marker: "\\02022";`];
		this.template = `<slot></slot>`;
	}
}

// @ts-ignore
customElements.define('trvt-ul', TrvtUl);
