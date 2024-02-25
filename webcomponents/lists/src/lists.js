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
		if (!this.dataset?.start) this.shadow.host.dataset.start = 0;
		this.start = this.dataset.start;

		this.hostCssProperties = [
			`--counter-start: ${+this.start};`,
			`--ul-marker: counter(--trivetlist);`,
		];
		this.shadowStyleSheets = trvtListCSS;
	}
}
// @ts-ignore
customElements.define('trvt-ol', TrvtOl);

export class TrvtUl extends ListClassElement {
	constructor() {
		super();
		this.hostCssProperties = [`--ul-marker: "\\02022";`];
		this.shadowStyleSheets = [trvtListCSS];
	}
}
// @ts-ignore
customElements.define('trvt-ul', TrvtUl);
