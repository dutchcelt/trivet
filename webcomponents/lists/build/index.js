import { TrivetElement as t } from '@trvt/core';
import s from './styles-d2b24117.css' assert { type: 'css' };
import e from './styles-cac57b72.css' assert { type: 'css' };
class l extends t {
	constructor() {
		super(),
			(this.shadowFragment = this.dataset?.start || 1),
			(this.shadowStyleSheets = s),
			(this.template = `<ol role="list" start=${this.start}><slot></slot></ol>`);
	}
}
customElements.define('trvt-ol', l);
class o extends t {
	constructor() {
		super(),
			(this.shadowStyleSheets = [s]),
			(this.addCSSPropertiesToHost = ['--ul-marker: "\\02022";']),
			(this.template = '<ul role="list"><slot></slot></ul>');
	}
}
customElements.define('trvt-ul', o);
class r extends t {
	constructor() {
		super(),
			(this.value = this.dataset?.value),
			(this.shadowStyleSheets = [e]),
			(this.addCSSPropertiesToHost = [
				'--counter-value',
				'' + (+this.value - 1),
			]),
			(this.template = `<li class="list-item" role="listitem" value="${this.value}"><slot></slot></li>`),
			console.log(this);
	}
}
customElements.define('trvt-li', r);
export { r as TrvtLi, l as TrvtOl, o as TrvtUl };
