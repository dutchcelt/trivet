import { TrivetElement as t } from '@trvt/core';
import s from './styles-3137dae0.css' assert { type: 'css' };
import e from './styles-612d5bf0.css' assert { type: 'css' };
class r extends t {
	#t;
	constructor() {
		super(),
			(this.#t = this.attachInternals()),
			(this.#t.role = 'list'),
			(this.template = '<slot></slot>');
	}
}
class a extends r {
	constructor() {
		super(),
			this.dataset?.start || (this.shadow.host.dataset.start = 0),
			(this.start = this.dataset.start),
			(this.hostCssProperties = [
				`--counter-start: ${+this.start};`,
				'--ul-marker: counter(--trivetlist);',
			]),
			(this.shadowStyleSheets = s);
	}
}
customElements.define('trvt-ol', a);
class i extends r {
	constructor() {
		super(),
			(this.hostCssProperties = ['--ul-marker: "\\02022";']),
			(this.shadowStyleSheets = [s]);
	}
}
customElements.define('trvt-ul', i);
class o extends t {
	#t;
	constructor() {
		super(),
			(this.#t = this.attachInternals()),
			(this.#t.role = 'listitem'),
			(this.start = this.shadow.host.parentElement?.dataset?.start),
			this.start &&
				(this.hostCssProperties = ['--ul-marker', 'counter(--trivetlist)']),
			(this.value = this.dataset?.value || this.start || 0),
			(this.shadowStyleSheets = [e]),
			(this.hostCssProperties = ['--counter-value', `${this.value}`]),
			(this.template = '<div><slot></slot><div>');
	}
}
customElements.define('trvt-li', o);
export { o as TrvtLi, a as TrvtOl, i as TrvtUl };
