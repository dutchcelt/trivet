// @ts-expect-error
import tableCSS from './table.css' with { type: 'css' };
import { styles, TrivetElement } from '@trvt/core';

/**
 * Represents a custom table element that extends TrivetElement.
 */
export class trvtTable extends TrivetElement {
	#internals;
	#breakpointStyleSheet;

	static get observedAttributes() {
		return ['data-breakpoint']; // List of attributes you want to observe
	}

	constructor() {
		super();
		this.#internals = this.attachInternals();
		this.#internals.role = 'table';
		this.#breakpointStyleSheet = new CSSStyleSheet();
		this.breakpoint = this.dataset.breakpoint;
		this.breakpointStyleSheet = this.breakpoint;

		this.shadowStyleSheets = [...styles, tableCSS, this.breakpointStyleSheet];

		this.addEventListener('cellupdate', this.renderTable);

		this.template = `
			<div class="scrollbox">
				<div class="table">
					<slot></slot>
				</div>
			</div>	
		`;
	}

	get rowElements() {
		return [...this.querySelectorAll('trvt-row')];
	}
	get numberOfRows() {
		return this.rowElements.length;
	}
	get numberOfColumns() {
		return Math.max(
			...this.rowElements.map(r =>
				this.getCellElements(r).reduce(
					(count, cell) => count + parseInt(cell.getAttribute('colspan') || 1),
					0,
				),
			),
		);
	}
	connectedCallback() {
		this.hostCssProperties = [
			`--trvt-number-of-rows:${this.numberOfRows};`,
			`--trvt-number-of-columns: ${this.numberOfColumns};`,
		];
		this.renderTable();
	}
	renderTable() {
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
			`--trvt-table-grid-template-areas: ${matrixString}`,
		];
	}

	/**
	 * Returns an array of cell elements within a given row element.
	 *
	 * @param {Element} row - The row element containing the cell elements.
	 * @returns {Element[]} - An array of cell elements within the given row.
	 */
	getCellElements(row) {
		return [...row.children].filter(child => /-cell/gi.test(child.tagName));
	}

	get breakpointStyleSheet() {
		return this.#breakpointStyleSheet;
	}
	set breakpointStyleSheet(breakpoint) {
		this.#breakpointStyleSheet.replaceSync(`@layer components.modifiers {
			@container --table (width < ${breakpoint}) {
				.scrollbox {
					--_table-writing-mode: vertical-lr;
					--_table-sticky-cell: sticky;
					--_table-sticky-header: sticky;
					--_table-scroll: scroll;
					}
				}
			}`);
	}

	attributeChangedCallback(name, oldValue, newValue) {
		switch (name) {
			case 'data-breakpoint':
				this.breakpointStyleSheet = newValue;
				break;
		}
	}
}
customElements.define('trvt-table', trvtTable);
