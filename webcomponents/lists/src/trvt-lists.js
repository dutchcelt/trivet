import { styles } from '@trvt/core';
import trvtListCSS from './trvt-list.css' assert { type: 'css' };

export class TrvtList extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.setAttribute('role', 'list');
		this.shadowRoot.adoptedStyleSheets = [...styles, trvtListCSS];
		this.shadowRoot.innerHTML = `<slot></slot>`;
	}
	addCSSPropertiesToHost = (propsArray) => {
		const sheet = new CSSStyleSheet();
		sheet.replaceSync(`:host { ${propsArray.join(';')} }`);
		this.shadowRoot.adoptedStyleSheets = [
			...this.shadowRoot.adoptedStyleSheets,
			sheet,
		];
	};
}

export class TrvtOl extends TrvtList {
	constructor() {
		super();
		this.start = this.dataset?.start || 1;
		this.addCSSPropertiesToHost([`--counter-start: ${this.start - 1};`]);
		if (!CSS.supports('grid-template-columns', 'subgrid')) {
			this.shadowRoot.innerHTML = `<ol start=${this.start}><slot></slot></ol>`;
		}
	}
}
customElements.define('trvt-ol', TrvtOl);

export class TrvtUl extends TrvtList {
	constructor() {
		super();
		this.addCSSPropertiesToHost([`--ul-marker: "\\02022";`]);
		if (!CSS.supports('grid-template-columns', 'subgrid')) {
			this.shadowRoot.innerHTML = `<ul><slot></slot></ul>`;
		}
	}
}
customElements.define('trvt-ul', TrvtUl);
