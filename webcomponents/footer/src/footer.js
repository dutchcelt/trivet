import { TrivetElement } from '@trvt/core';

export class TrvtFooter extends TrivetElement {
	constructor() {
		super();
		this.template = `<slot></slot>`;
	}
}
customElements.define('trvt-footer', TrvtFooter);
