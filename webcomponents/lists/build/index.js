import { styles as t } from '@trvt/core';
import s from './styles-d2b24117.css' assert { type: 'css' };
import e from './styles-cac57b72.css' assert { type: 'css' };
class o extends HTMLElement {
	constructor() {
		super(),
			this.attachShadow({ mode: 'open' }),
			this.setAttribute('role', 'list'),
			(this.shadowRoot.adoptedStyleSheets = [...t, s]),
			(this.shadowRoot.innerHTML = '<slot></slot>');
	}
	addCSSPropertiesToHost = t => {
		const s = new CSSStyleSheet();
		s.replaceSync(`:host { ${t.join(';')} }`),
			(this.shadowRoot.adoptedStyleSheets = [
				...this.shadowRoot.adoptedStyleSheets,
				s,
			]);
	};
}
class r extends o {
	constructor() {
		super(),
			(this.start = this.dataset?.start || 1),
			this.addCSSPropertiesToHost([`--counter-start: ${this.start - 1};`]),
			CSS.supports('grid-template-columns', 'subgrid') ||
				(this.shadowRoot.innerHTML = `<ol start=${this.start}><slot></slot></ol>`);
	}
}
customElements.define('trvt-ol', r);
class i extends o {
	constructor() {
		super(),
			this.addCSSPropertiesToHost(['--ul-marker: "\\02022";']),
			CSS.supports('grid-template-columns', 'subgrid') ||
				(this.shadowRoot.innerHTML = '<ul><slot></slot></ul>');
	}
}
customElements.define('trvt-ul', i);
class l extends HTMLElement {
	constructor() {
		super(),
			this.attachShadow({ mode: 'open' }),
			(this.shadowRoot.adoptedStyleSheets = [...t, e]),
			(this.value = this.dataset?.value),
			CSS.supports('grid-template-columns', 'subgrid')
				? (this.value &&
						this.style.setProperty('--counter-value', '' + (this.value - 1)),
				  this.setAttribute('role', 'listitem'),
				  (this.shadowRoot.innerHTML =
						'<div class="list-item"><slot></slot></div>'))
				: (this.shadowRoot.innerHTML = `<li class="list-item" value="${this.value}"><slot></slot></li>`);
	}
}
customElements.define('trvt-li', l);
export { l as TrvtLi, r as TrvtOl, i as TrvtUl };
