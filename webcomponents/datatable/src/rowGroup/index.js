import rowgroupCSS from './rowGroup.css' assert { type: 'css' };
import { styles } from '@trvt/core';

export class trvtRowGroup extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: 'open' });
		this.setAttribute('role', 'rowgroup');
		this.style.setProperty('--trvt-row-length', this.children.length);
		this.shadowRoot.adoptedStyleSheets = [...styles, rowgroupCSS];

		this.shadowRoot.innerHTML = `<slot></slot>`;
	}
}
