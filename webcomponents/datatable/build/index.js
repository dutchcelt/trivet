import t from './styles-895f95da.css' assert { type: 'css' };
import { styles as s } from '@trvt/core';
import e from './styles-a6de3413.css' assert { type: 'css' };
import o from './styles-29c51950.css' assert { type: 'css' };
import r from './styles-49200113.css' assert { type: 'css' };
import { throttler as i } from '@trvt/assets';
import l from './styles-30a5a840.css' assert { type: 'css' };
class n extends HTMLElement {
	constructor() {
		super(),
			this.attachShadow({ mode: 'open' }),
			this.setAttribute('role', 'cell'),
			(this.shadowRoot.adoptedStyleSheets = [...s, t]),
			(this.shadowRoot.innerHTML = '\n\t\t\t<div><slot></slot></div>\n\t\t'),
			(this.colspan = this.getAttribute('colspan') || 1),
			(this.rowspan = this.getAttribute('rowspan') || 1),
			(this.colstart = this.getAttribute('colstart') || 'auto'),
			this.style.setProperty('--trvt-cell-row-span', this.rowspan),
			this.style.setProperty('--trvt-cell-col-span', this.colspan),
			this.style.setProperty('--trvt-cell-col-start', this.colstart);
	}
	connectedCallback() {}
}
customElements.define('trvt-cell', n);
class h extends HTMLElement {
	constructor() {
		super(),
			this.attachShadow({ mode: 'open' }),
			this.setAttribute('role', 'row'),
			(this.shadowRoot.adoptedStyleSheets = [...s, e]),
			(this.shadowRoot.innerHTML = '<slot></slot>');
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
		} catch (t) {}
	}
}
customElements.define('trvt-row', h);
class a extends HTMLElement {
	constructor() {
		super(),
			this.attachShadow({ mode: 'open' }),
			this.setAttribute('role', 'rowgroup'),
			this.style.setProperty('--trvt-row-length', this.children.length),
			(this.shadowRoot.adoptedStyleSheets = [...s, o]),
			(this.shadowRoot.innerHTML = '<slot></slot>');
	}
}
class c extends a {
	constructor() {
		super();
	}
}
customElements.define('trvt-thead', c);
class p extends a {
	constructor() {
		super();
	}
}
customElements.define('trvt-tbody', p);
class d extends a {
	constructor() {
		super();
	}
}
customElements.define('trvt-tfoot', d);
class m extends HTMLElement {
	constructor() {
		super(),
			this.attachShadow({ mode: 'open' }),
			this.setAttribute('role', 'columnheader'),
			(this.shadowRoot.adoptedStyleSheets = [...s, r]),
			(this.colspan = this.getAttribute('colspan') || 1),
			(this.rowspan = this.getAttribute('rowspan') || 1),
			(this.colstart = this.getAttribute('colstart') || 'auto'),
			this.style.setProperty('--trvt-cell-row-span', this.rowspan),
			this.style.setProperty('--trvt-cell-col-span', this.colspan),
			this.style.setProperty('--trvt-cell-col-start', this.colstart),
			(this.shadowRoot.innerHTML = '<div><slot></slot></div>');
	}
}
customElements.define('trvt-header-cell', m);
class u extends HTMLElement {
	constructor() {
		super(),
			this.attachShadow({ mode: 'open' }),
			this.setAttribute('role', 'table'),
			(this.breakpoint = 680),
			(this.rowElements = this.querySelectorAll('trvt-row')),
			(this.shadowRoot.adoptedStyleSheets = [...s, l]),
			(this.numberOfRows =
				+this.style.getPropertyValue('--number-of-rows') ||
				[...this.rowElements].length),
			(this.numberOfColumns =
				+this.style.getPropertyValue('--number-of-columns') ||
				Math.max(...[...this.rowElements].map(t => t.children?.length))),
			this.style.setProperty('--trvt-number-of-rows', this.numberOfRows),
			this.style.setProperty('--trvt-number-of-columns', this.numberOfColumns),
			this.style.setProperty('--trvt-table-breakpoint', this.breakpoint),
			(this.shadowRoot.innerHTML =
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
			o = s ? 'sticky' : 'unset';
		this.style.setProperty('--_table-writing-mode', e),
			this.style.setProperty('--_table-sticky-cell', o),
			this.style.setProperty('--_table-sticky-header', o),
			this.style.setProperty('--_table-scroll', o);
	}
}
customElements.define('trvt-table', u);
export {
	n as trvtCell,
	m as trvtHeaderCell,
	h as trvtRow,
	a as trvtRowGroup,
	u as trvtTable,
	p as trvtTbody,
	d as trvtTfoot,
	c as trvtThead,
};
