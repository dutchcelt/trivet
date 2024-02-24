import { TrivetElement } from '@trvt/core';
import trvtListCSS from './list.css' assert { type: 'css' };

class ListClassElement extends TrivetElement {
	#internals;
	constructor() {
		super();
		this.#internals = this.attachInternals();
		this.#internals.role = 'list';
		this.template = `<slot></slot>`;
	}
}
export class TrvtOl extends ListClassElement {
	constructor() {
		super();
		this.start = this.dataset?.start;
		if (!this.start) this.shadow.host.dataset.start = 1;
		this.shadowStyleSheets = trvtListCSS;
		this.hostCssProperties = [
			`--counter-start: ${this.start};`,
			`--ul-marker: counter(--trivetlist);`,
		];
	}
}

// @ts-ignore
customElements.define('trvt-ol', TrvtOl);

export class TrvtUl extends ListClassElement {
	constructor() {
		super();
		this.shadowStyleSheets = [trvtListCSS];
		this.hostCssProperties = [`--ul-marker: "\\02022";`];
	}
}

// @ts-ignore
customElements.define('trvt-ul', TrvtUl);
