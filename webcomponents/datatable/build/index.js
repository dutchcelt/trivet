import t from './styles-895f95da.css' assert { type: 'css' };
import { TrivetElement as s, styles as e } from '@trvt/core';
import r from './styles-a6de3413.css' assert { type: 'css' };
import o from './styles-29c51950.css' assert { type: 'css' };
import l from './styles-49200113.css' assert { type: 'css' };
import { throttler as i } from '@trvt/assets';
import n from './styles-30a5a840.css' assert { type: 'css' };
class c extends s {
	constructor() {
		super(),
			this.setAttribute('role', 'cell'),
			(this.shadowStyleSheets = [...e, t]),
			(this.template = '\n\t\t\t<div><slot></slot></div>\n\t\t'),
			(this.colspan = this.getAttribute('colspan') || 1),
			(this.rowspan = this.getAttribute('rowspan') || 1),
			(this.colstart = this.getAttribute('colstart') || 'auto'),
			this.style.setProperty('--trvt-cell-row-span', this.rowspan),
			this.style.setProperty('--trvt-cell-col-span', this.colspan),
			this.style.setProperty('--trvt-cell-col-start', this.colstart);
	}
	connectedCallback() {}
}
customElements.define('trvt-cell', c);
class h extends s {
	constructor() {
		super(),
			this.setAttribute('role', 'row'),
			(this.shadowStyleSheets = [...e, r]),
			(this.template = '<slot></slot>');
	}
	connectedCallback() {
		try {
			if (CSS.supports('grid-template-columns', 'subgrid'))
				this.rowNumber = [...this.parentElement.children].indexOf(this) + 1;
			else {
				const t = this.closest('trvt-table');
				this.rowNumber = [...t.rowElements].indexOf(this) + 1;
			}
			this.style.setProperty('--trvt-row-number', this.rowNumber);
		} catch (t) {
			console.log(t);
		}
	}
}
customElements.define('trvt-row', h);
class a extends s {
	constructor() {
		super(),
			this.setAttribute('role', 'rowgroup'),
			this.style.setProperty('--trvt-row-length', this.children.length),
			(this.shadowStyleSheets = [...e, o]),
			(this.template = '<slot></slot>');
	}
}
class p extends a {
	constructor() {
		super();
	}
}
customElements.define('trvt-thead', p);
class u extends a {
	constructor() {
		super();
	}
}
customElements.define('trvt-tbody', u);
class m extends a {
	constructor() {
		super();
	}
}
customElements.define('trvt-tfoot', m);
class y extends s {
	constructor() {
		super(),
			this.setAttribute('role', 'columnheader'),
			(this.shadowStyleSheets = [...e, l]),
			(this.colspan = this.getAttribute('colspan') || 1),
			(this.rowspan = this.getAttribute('rowspan') || 1),
			(this.colstart = this.getAttribute('colstart') || 'auto'),
			this.style.setProperty('--trvt-cell-row-span', this.rowspan),
			this.style.setProperty('--trvt-cell-col-span', this.colspan),
			this.style.setProperty('--trvt-cell-col-start', this.colstart),
			(this.template = '<div><slot></slot></div>');
	}
}
customElements.define('trvt-header-cell', y);
class d extends s {
	constructor() {
		super(),
			this.setAttribute('role', 'table'),
			(this.breakpoint = 680),
			(this.rowElements = this.querySelectorAll('trvt-row')),
			(this.shadowStyleSheets = [...e, n]),
			(this.numberOfRows =
				+this.style.getPropertyValue('--number-of-rows') ||
				[...this.rowElements].length),
			(this.numberOfColumns =
				+this.style.getPropertyValue('--number-of-columns') ||
				Math.max(...[...this.rowElements].map(t => t.children?.length))),
			this.style.setProperty('--trvt-number-of-rows', `${this.numberOfRows}`),
			this.style.setProperty(
				'--trvt-number-of-columns',
				`${this.numberOfColumns}`
			),
			this.style.setProperty('--trvt-table-breakpoint', `${this.breakpoint}`),
			(this.template =
				'\n\t\t\t<div class="scrollbox">\n\t\t\t\t<div class="table">\n\t\t\t\t\t<slot></slot>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t'),
			CSS.supports('container', 'test / inline-size') ||
				window.addEventListener(
					'resize',
					i(this.setRotationProperties, 300, this)
				);
	}
	setRotationProperties() {
		const { width: t } = this.getBoundingClientRect(),
			s = t < this.breakpoint,
			e = s ? 'vertical-lr' : 'horizontal-tb',
			r = s ? 'sticky' : 'unset';
		this.style.setProperty('--_table-writing-mode', e),
			this.style.setProperty('--_table-sticky-cell', r),
			this.style.setProperty('--_table-sticky-header', r),
			this.style.setProperty('--_table-scroll', r);
	}
}
customElements.define('trvt-table', d);
export {
	c as trvtCell,
	y as trvtHeaderCell,
	h as trvtRow,
	a as trvtRowGroup,
	d as trvtTable,
	u as trvtTbody,
	m as trvtTfoot,
	p as trvtThead,
};
