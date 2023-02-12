import { throttler } from '@trvt/assets';
import tableCSS from './table.css' assert { type: 'css' };
import { styles } from '@trvt/core';

export class trvtTable extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.setAttribute('role', 'table');
		this.breakpoint = 680;
		this.rowElements = this.querySelectorAll('trvt-row');
		this.shadowRoot.adoptedStyleSheets = [...styles, tableCSS];

		this.numberOfRows =
			+this.style.getPropertyValue('--number-of-rows') ||
			[...this.rowElements].length;

		this.numberOfColumns =
			+this.style.getPropertyValue('--number-of-columns') ||
			Math.max(...[...this.rowElements].map((r) => r.children?.length));

		this.style.setProperty('--trvt-number-of-rows', this.numberOfRows);
		this.style.setProperty(
			'--trvt-number-of-columns',
			this.numberOfColumns
		);
		this.style.setProperty('--trvt-table-breakpoint', this.breakpoint);

		this.shadowRoot.innerHTML = `
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

		this.style.setProperty('--table-writing-mode', direction);
		this.style.setProperty('--table-sticky-cell', sticky);
		this.style.setProperty('--table-sticky-header', sticky);
		this.style.setProperty('--table-scroll', sticky);
	}
}
customElements.define('trvt-table', trvtTable);
