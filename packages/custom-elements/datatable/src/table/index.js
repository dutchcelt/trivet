// @ts-expect-error
import tableCSS from './table.css' with { type: 'css' };
import { styles, TrivetElement } from '@trvt/core';

/**
 * Represents a custom table element that extends TrivetElement.
 */
export class trvtTable extends TrivetElement {
	#internals;
	#breakpointStyleSheet;

	constructor() {
		super();
		this.#internals = this.attachInternals();
		this.#internals.role = 'table';
		this.#breakpointStyleSheet = new CSSStyleSheet();

		this.breakpoint = this.dataset.breakpoint;
		this.rowElements = [...this.querySelectorAll('trvt-row')];

		this.shadowStyleSheets = [...styles, tableCSS, this.breakpointStyleSheet];

		/**
		 * Returns an array of cell elements within a given row element.
		 *
		 * @param {Element} row - The row element containing the cell elements.
		 * @returns {Element[]} - An array of cell elements within the given row.
		 */
		const getCellElements = row =>
			[...row.children].filter(child => /-cell/gi.test(child.tagName));

		/* You can't have implied rows. So the number of rows is the number of rows */
		// this.numberOfRows = this.rowElements
		// 	.reduce((count,row) => {
		// 		return count += Math.max(...getCellElements(row)
		// 			.map((cell) => {
		// 				return (parseInt(cell.getAttribute('rowspan') || '1') - 1 ) || 1
		// 			})
		// 		);
		// 	}, 0);

		this.numberOfRows = this.rowElements.length;

		this.numberOfColumns = Math.max(
			...this.rowElements.map(r =>
				getCellElements(r).reduce(
					(count, cell) => count + parseInt(cell.getAttribute('colspan') || 1),
					0,
				),
			),
		);
		this.template = `
			<div class="scrollbox">
				<div class="table">
					<slot></slot>
				</div>
			</div>	
		`;
	}
	connectedCallback() {
		const matrix = [...this.rowElements].map(() =>
			new Array(this.numberOfColumns).fill(undefined),
		);
		[...this.rowElements].forEach((row, rowIndex) => {
			const cells = [...row.children].filter(cell =>
				/-cell/gi.test(cell.tagName),
			);
			let updatedCellIndex = 0;
			[...cells].forEach(cell => {
				const rowSpan = Math.min(
					parseInt(cell.getAttribute('rowspan')) || 1,
					this.numberOfRows - rowIndex,
				);
				const colSpan = parseInt(cell.getAttribute('colspan')) || 1;
				while (matrix[rowIndex][updatedCellIndex] !== undefined) {
					updatedCellIndex++;
				}
				cell.cellName = `cell-${rowIndex + 1}-${updatedCellIndex + 1}`;
				for (let n = 0; n < rowSpan; n++) {
					for (let i = 0; i < colSpan; i++) {
						matrix[rowIndex + n][updatedCellIndex + i] = cell.cellName;
					}
				}
			});
		});
		const matrixString = matrix.map(row => `"${row.join(' ')}"`).join(' ');
		this.hostCssProperties = [
			`--trvt-number-of-rows:${this.numberOfRows};`,
			`--trvt-number-of-columns: ${this.numberOfColumns};`,
			`--trvt-table-grid-template-areas: ${matrixString}`,
		];
	}
	get breakpointStyleSheet() {
		this.#breakpointStyleSheet.replaceSync(`:host([data-breakpoint]) {
				@container --table (width < ${this.breakpoint}) {
					.scrollbox {
							--_table-writing-mode: vertical-lr;
							--_table-sticky-cell: sticky;
							--_table-sticky-header: sticky;
							--_table-scroll: scroll;
						}
					}
				}`);
		return this.#breakpointStyleSheet;
	}
}
customElements.define('trvt-table', trvtTable);
