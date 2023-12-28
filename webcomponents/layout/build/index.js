import { TrivetElement as t } from '@trvt/core';
import s from './styles-c756f743.css' assert { type: 'css' };
class e extends t {
	constructor() {
		var t, e, i;
		super(),
			(this.slotNames =
				((t = Object.keys(this.#t())),
				(i = this.children),
				(e = [...i]
					.filter(t => t.hasAttribute('slot'))
					.map(t => t.getAttribute('slot'))),
				t.filter(t => e.some(s => s === t)))),
			(this.type = this.dataset?.type || 'page'),
			(this.collapsed = this.dataset?.collapse),
			(this.position = this.dataset?.contentPosition || 'start'),
			(this.shadowStyleSheets = s),
			(this.shadow.innerHTML = '<div class="trvt-layout"></div>'),
			this.#s(this.shadowFragment);
	}
	connectedCallback() {}
	#e(t = 'main') {
		const s = this.slotNames.includes(t) ? `[name=${t}]` : '[name]';
		return this.shadowRoot.querySelector(`slot${s}`);
	}
	#s(t) {
		t &&
			(t.classList.add(this.type, this.position),
			(t.innerHTML = this.slotNames.length ? this.#i() : '<slot></slot>'));
	}
	#i() {
		return this.slotNames.map(t => this.#t()[t] || '').join('');
	}
	#t() {
		return {
			notifications:
				'<div class="notifications"><slot name="notifications"></slot></div>',
			navigation:
				'<nav class="navigation"><slot name="navigation"></slot></nav>',
			header: '<div class="header"><slot name="header"></slot></div>',
			main: '<div class="main content"><slot name="main"></slot></div>',
			sidebar:
				'<div class="sidebar content"><slot name="sidebar"></slot></div>',
			footer: '<div class="footer"><slot name="footer"></slot></div>',
		};
	}
}
customElements.define('trvt-layout', e);
export { e as TrvtLayout };
