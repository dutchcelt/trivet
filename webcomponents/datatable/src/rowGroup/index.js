import rowgroupCSS from './rowGroup.css' assert { type: 'css' };
import { styles, TrivetElement } from '@trvt/core';

export class trvtRowGroup extends TrivetElement {
	constructor() {
		super();

		this.setAttribute('role', 'rowgroup');
		this.style.setProperty(
			'--trvt-row-length',
			this.children.length.toString()
		);
		this.shadowStyleSheets = [...styles, rowgroupCSS];

		this.template = `<slot></slot>`;
	}
}
