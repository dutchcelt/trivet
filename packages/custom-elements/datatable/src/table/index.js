import { throttler } from '@trvt/utils';
import tableCSS from './table.css' with { type: 'css' };
import { styles, TrivetElement } from '@trvt/core';

/**
 * Represents a custom table element that extends TrivetElement.
 */
export class trvtTable extends TrivetElement {
	constructor() {
		super();
		this.setAttribute('role', 'table');
		this.breakpoint = 680;
		this.rowElements = this.querySelectorAll('trvt-row');
		this.shadowStyleSheets = [...styles, tableCSS];

		this.numberOfRows =
			+this.style.getPropertyValue('--number-of-rows') ||
			[...this.rowElements].length;

		this.numberOfColumns =
			+this.style.getPropertyValue('--number-of-columns') ||
			Math.max(...[...this.rowElements].map(r => r.children?.length));

		this.style.setProperty('--trvt-number-of-rows', `${this.numberOfRows}`);
		this.style.setProperty(
			'--trvt-number-of-columns',
			`${this.numberOfColumns}`
		);
		this.style.setProperty('--trvt-table-breakpoint', `${this.breakpoint}`);

		this.template = `
			<div class="scrollbox">
				<div class="table">
					<slot></slot>
				</div>
			</div>
		`;
		// Container query fallback :(
		if (!CSS.supports('container', 'test / inline-size')) {
			window.addEventListener(
				'resize',
				throttler(this.setRotationProperties, 300, this)
			);
		}
	}
	setRotationProperties() {
		const { width } = this.getBoundingClientRect();
		const rotated = width < this.breakpoint;

		const direction = rotated ? 'vertical-lr' : 'horizontal-tb';
		const sticky = rotated ? 'sticky' : 'unset';

		this.style.setProperty('--_table-writing-mode', direction);
		this.style.setProperty('--_table-sticky-cell', sticky);
		this.style.setProperty('--_table-sticky-header', sticky);
		this.style.setProperty('--_table-scroll', sticky);
	}
}
customElements.define('trvt-table', trvtTable);
