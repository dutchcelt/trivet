// @ts-expect-error
import cellCSS from './cell.css' with { type: 'css' };
import { styles, TrivetElement } from '@trvt/core';

export class trvtCell extends TrivetElement {
	constructor() {
		super();
		this.setAttribute('role', 'cell');
		this.shadowStyleSheets = [...styles, cellCSS];

		this.template = `
			<div><slot></slot></div>
		`;

		this.colspan = this.getAttribute('colspan') || '1';
		this.rowspan = this.getAttribute('rowspan') || '1';
		this.colstart = 'auto';

		if (this.colspan > 1) {
			const trvtTableElement = this.closest('trvt-table');
			const trvtRowElements = trvtTableElement.querySelectorAll('trvt-row');
			const numberOfColumns = Math.max(
				...[...trvtRowElements].map(r => r.children?.length),
			);
			const colOffset = numberOfColumns - +this.colspan;

			if (colOffset > 0) {
				const spanIndex = [...this.parentElement.children].indexOf(this);
				if (spanIndex === 0) {
					this.colstart = colOffset + 1;
				}
			}
		}

		this.style.setProperty('--trvt-cell-row-span', this.rowspan);
		this.style.setProperty('--trvt-cell-col-span', this.colspan);
		this.style.setProperty('--trvt-cell-col-start', this.colstart);
	}

	connectedCallback() {}
}

customElements.define('trvt-cell', trvtCell);
