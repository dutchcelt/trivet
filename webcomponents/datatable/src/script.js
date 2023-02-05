import { throttler } from "throttler";

class trvtTable extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.setAttribute("role", "table");
		this.breakpoint = 680;
		this.rowElements = this.querySelectorAll("trvt-row");

		this.numberOfRows =
			+this.style.getPropertyValue("--number-of-rows") ||
			[...this.rowElements].length;

		this.numberOfColumns =
			+this.style.getPropertyValue("--number-of-columns") ||
			Math.max(...[...this.rowElements].map((r) => r.children?.length));

		this.shadowRoot.innerHTML = `
			<style>
				:host {
					--nested-grid-diplay: contents;
					--canvas: #ffffff;
					--canvasText: #1e1e1e;
					--table-writing-mode: horizontal-tb;
					--table-scroll: unset;
					--table-sticky-cell: unset;
					--table-sticky-header: unset;
					--table-cell-width: 75ch;
				}
				@supports (grid-template-columns: subgrid) {
					:host {
						--nested-grid-diplay: grid;
					}
				}
				@media (prefers-color-scheme: dark) {
					:host {
						--canvas: #1e1e1e;
						--canvasText: #ffffff;
					}
				}
				:host {
					display: block;
					width: 100%;
					container: test / inline-size;
				}
				.scrollbox  {
					overflow-x: var(--table-scroll);
					height: 100%;
				}

				.table {	
					writing-mode: var(--table-writing-mode);
					display: grid;
					grid-template-columns: repeat(var(--number-of-columns, ${this.numberOfColumns}), auto);
					grid-template-rows: repeat(var(--number-of-rows, ${this.numberOfRows}), auto);
					border-top: 2px solid var(--canvasText);
					border-right: 2px solid var(--canvasText);
					background-color: var(--canvas);
					color: var(--canvasText);
				}
				
				@container test (max-width: ${this.breakpoint}px) {
					
					.scrollbox  {
						--table-scroll: scroll;
					}
					.table {	
						--table-writing-mode: vertical-lr;
						--table-sticky-cell: sticky;
						--table-sticky-header: sticky;
						--table-cell-width: 30ch;
					}
				}

			</style>
			<div class="scrollbox">
				<div class="table">
					<slot></slot>
				</div>
			</div>
		`;
		
		if (!CSS.supports("container", "test / inline-size")) {
			window.addEventListener('resize', throttler(this.setRotationProperties, 300, this));
		}

	}
	setRotationProperties(){
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
customElements.define("trvt-table", trvtTable);

class trvtCell extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.setAttribute("role", "cell");

		this.colspan = this.getAttribute("colspan") || 1;
		this.rowspan = this.getAttribute("rowspan") || 1;
		this.colstart = this.getAttribute("colstart") || "auto";

		this.shadowRoot.innerHTML = `
		<style>
			:host {
				writing-mode: horizontal-tb;
				grid-column: ${this.colstart} / span ${this.colspan};
				grid-row: var(--grid-row, auto) / span ${this.rowspan};

				border-bottom: 2px solid var(--canvasText);
				border-left: 2px solid var(--canvasText);
				background-color: var(--canvas);
				color: var(--canvasText);
				text-align: var(--cell-justify, initial);
			}
			
			:host([type='info']) {
				font-style: italic;
				font-size: smaller;
			}
			div {
				padding: 1ex 1ch;
				max-width: var(--table-cell-width);
			}
		</style>
		<div><slot></slot></div>
	`;
	}
	connectedCallback() {}
}
customElements.define("trvt-cell", trvtCell);

class trvtHeaderCell extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.setAttribute("role", "columnheader");

		this.colspan = this.getAttribute("colspan") || 1;
		this.rowspan = this.getAttribute("rowspan") || 1;
		this.colstart = this.getAttribute("colstart") || "auto";

		this.shadowRoot.innerHTML = `
		<style>
			:host {
				writing-mode: horizontal-tb;
				grid-column: ${this.colstart} / span ${this.colspan};
				grid-row: var(--grid-row, auto) / span ${this.rowspan};
				display: flex;
				align-items: center;
				background-color: var(--canvasText);
				color: var(--canvas);
				white-space:nowrap;
				font-weight: 900;
				text-align: center;				
			}
			@supports not (grid-template-columns: subgrid) {
				:host {
					position: var(--table-sticky-cell);
					left: 0;
				}
			}
			div {
				padding: 0.5ex 2ch;
				
			}
		
		</style>
		<div><slot></slot></div>
	`;
	}
}
customElements.define("trvt-header-cell", trvtHeaderCell);

class trvtRowGroup extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: "open" });
		this.setAttribute("role", "rowgroup");

		this.shadowRoot.innerHTML = `
			<style>
				:host{
					display: var(--nested-grid-diplay);
					grid-template-columns: subgrid;
					grid-template-rows: subgrid;
					grid-column: 1 / -1;
					grid-row: auto / span ${this.children.length}
				}
				:host(trvt-tfoot){
					--cell-justify: center;
					--table-cell-width: none;
				}
				@supports (grid-template-columns: subgrid) {
					:host(trvt-thead){
						position: var(--table-sticky-header);
						left: 0;
					}
				}

			</style>
			<slot></slot>
		`;
	}
}

class trvtTbody extends trvtRowGroup {
	constructor() {
		super();
	}
}
customElements.define("trvt-tbody", trvtTbody);

class trvtThead extends trvtRowGroup {
	constructor() {
		super();
	}
}
customElements.define("trvt-thead", trvtThead);

class trvtTfoot extends trvtRowGroup {
	constructor() {
		super();
	}
}
customElements.define("trvt-tfoot", trvtTfoot);

class trvtRow extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.setAttribute("role", "row");

		if (CSS.supports("grid-template-columns", "subgrid")) {
			this.rowNumber = [...this.parentElement.children].indexOf(this) + 1;
		} else {
			const table = this.closest("trvt-table");
			this.rowNumber = [...table.rowElements].indexOf(this) + 1;
		}

		this.shadowRoot.innerHTML = `
			<style>
				:host {
					--grid-row: ${this.rowNumber};
					display: var(--nested-grid-diplay);
					grid-template-columns: subgrid;
					grid-template-rows: subgrid;
					grid-column: 1 / -1;
					grid-row: 1 / -1;
			}
			
			</style>
			<slot></slot>
		`;
	}
}
customElements.define("trvt-row", trvtRow);
