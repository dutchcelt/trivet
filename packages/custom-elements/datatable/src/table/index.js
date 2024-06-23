import { throttler } from '@trvt/utils';
// @ts-expect-error
import tableCSS from './table.css' with { type: 'css' };
import { styles, TrivetElement } from '@trvt/core';

/**
 * Represents a custom table element that extends TrivetElement.
 */
export class trvtTable extends TrivetElement {
	#internals;

	constructor() {
		super();
		this.#internals = this.attachInternals();
		this.#internals.role = 'table';
		this.breakpoint = parseInt(this.dataset.breakpoint) || 0;
		this.rowElements = [...this.querySelectorAll('trvt-row')];
		this.shadowStyleSheets = [...styles, tableCSS];

		this.numberOfRows = this.rowElements.length;
		this.numberOfColumns = Math.max(
			...this.rowElements.map(r => r.children?.length),
		);

		this.hostCssProperties = [
			`--trvt-number-of-rows:${this.numberOfRows};`,
			`--trvt-number-of-columns: ${this.numberOfColumns};`,
			`--trvt-table-breakpoint: ${this.breakpoint};`,
		];
		this.template = `
			<div class="scrollbox">
				<div class="table">
					<slot></slot>
				</div>
			</div>	
		`;
		// Container query fallback :(
		if (!CSS.supports('container', '--table / inline-size')) {
			window.addEventListener(
				'resize',
				// @ts-expect-error
				throttler(this.setRotationProperties, 300, this),
			);
		}
		const matrix = [...this.rowElements].map(() =>
			new Array(this.numberOfColumns).fill(undefined),
		);

		[...this.rowElements].forEach((row, rowIndex) => {
			const cells = [...row.children].filter(cell =>
				/trvt-cell|trvt-header-cell/gi.test(cell.tagName),
			);
			let updatedCellIndex = 0;
			[...cells].forEach(cell => {
				const rowSpan = parseInt(cell.getAttribute('rowspan'));
				const colSpan = parseInt(cell.getAttribute('colspan'));
				while (matrix[rowIndex][updatedCellIndex] !== undefined) {
					updatedCellIndex++;
				}
				cell.cellName = `cell-${rowIndex + 1}-${updatedCellIndex + 1}`;

				matrix[rowIndex][updatedCellIndex] = cell.cellName;
				if (typeof colSpan === 'number') {
					for (let i = 0; i < colSpan; i++) {
						matrix[rowIndex][updatedCellIndex + i] = cell.cellName;
					}
				}
				if (typeof rowSpan === 'number') {
					for (let n = 0; n < rowSpan; n++) {
						matrix[rowIndex + n][updatedCellIndex] = cell.cellName;
					}
				}
			});
		});
		const matrixString = matrix.map(row => `"${row.join(' ')}"`).join(' ');
		this.hostCssProperties = [
			`--trvt-table-grid-template-areas: ${matrixString}`,
		];
	}
	setRotationProperties() {
		const { width } = this.getBoundingClientRect();
		const rotated = width < this.breakpoint;

		const direction = rotated ? 'vertical-lr' : 'horizontal-tb';
		const sticky = rotated ? 'sticky' : 'unset';
		const scroll = rotated ? 'scroll' : 'unset';
		this.shadowCSSvars = [
			`--_table-writing-mode: ${direction}`,
			`--_table-sticky-cell: ${sticky}`,
			`--_table-sticky-header: ${sticky}`,
			`--_table-scroll: ${scroll}`,
		];
	}
}
customElements.define('trvt-table', trvtTable);
