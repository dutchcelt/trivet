import { TrivetElement } from '@trvt/core';
// @ts-expect-error
import trvtItemCSS from './li.css' with { type: 'css' };

export class TrvtLi extends TrivetElement {
	#internals;
	constructor() {
		super();
		this.#internals = this.attachInternals();
		this.#internals.role = 'listitem';

		this.start = this.shadow.host.parentElement?.dataset?.start;
		if (this.start) {
			this.hostCssProperties = ['--ul-marker', `counter(--trivetlist)`];
		}
		this.value = this.dataset?.value || this.start || 0;

		this.shadowStyleSheets = [trvtItemCSS];
		this.hostCssProperties = ['--counter-value', `${this.value}`];
		this.template = `<div class="list-item"><slot></slot><div>`;
		// this.setAttribute('role', 'listitem');
	}
}

// @ts-ignore
customElements.define('trvt-li', TrvtLi);
