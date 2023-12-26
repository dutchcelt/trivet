import {
	mix as t,
	TrivetElement as e,
	FormMixin as i,
	ReactiveMixin as s,
} from '@trvt/core';
import n from './styles-ecf25908.css' assert { type: 'css' };
const r = t => ' ' === t.key || 'Enter' === t.key,
	a = t => ' ' === t.key,
	d = t =>
		class extends t {
			#t() {
				this.formElement.readonly ||
					this.formElement.disabled ||
					!this.isSubmit ||
					this.form.submit();
			}
			#e() {
				this.active = !0;
				const t = () => {
					(this.active = !1),
						document.removeEventListener('mouseup', t),
						this.removeEventListener('mouseup', t);
				};
				document.addEventListener('mouseup', t),
					this.addEventListener('mouseup', t);
			}
			#i(t) {
				if (this.active || !r(t)) return void (a(t) && t.preventDefault());
				a(t) && t.preventDefault(), (this.active = !0);
				const e = t => {
					r(t) &&
						((this.active = !1), document.removeEventListener('keyup', e, !0));
				};
				document.addEventListener('keyup', e, !0);
			}
			#s(t) {
				r(t) && this.#t();
			}
			constructor(...t) {
				super(...t),
					this.addEventListener('click', t => this.#t()),
					this.addEventListener('mousedown', this.#e),
					this.addEventListener('keydown', this.#i),
					this.addEventListener('keyup', this.#s);
			}
		};
class o extends t(e).with(i, d, s) {
	static observedAttributes = [
		'data-trvt-context',
		'data-trvt-disabled',
		'data-trvt-readonly',
	];
	constructor() {
		super(),
			this.#n('trvtType', 'button'),
			this.#n('trvtValue', ''),
			this.#n('trvtContext', 'default'),
			this.#n('trvtDisabled', !1),
			this.#n('trvtReadonly', !1),
			(this.shadowStyleSheets = [n]),
			(this.template = this.#r());
	}
	#n(t, e) {
		(this[t] = this.dataset?.[t] || e), delete this.dataset[t];
	}
	#r() {
		return `\n            <button \n                type="${
			this.trvtType
		}"\n                ${this.hidden ? ' hidden' : ''}\t\n                ${
			this.value ? ` value="${this.value}"` : ''
		}\n                ${
			this.trvtDisabled ? ' disabled' : ''
		}\n                ${
			this.trvtReadonly ? ' readonly' : ''
		}\n                ${this.id ? ` id="${this.id}"` : ''}\n                ${
			this.name ? ` name="${this.name}"` : ''
		} \n            >\n                <slot></slot>\n            </button>\n        `;
	}
}
customElements.define('trvt-button', o);
export { o as TrvtButton };
