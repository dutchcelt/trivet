import {
	mix as t,
	TrivetElement as e,
	FormMixin as s,
	ReactiveMixin as n,
} from '@trvt/core';
import i from './styles-8f65d4bf.css' assert { type: 'css' };
const d = t => ' ' === t.key || 'Enter' === t.key,
	a = t => ' ' === t.key,
	r = t =>
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
			#s(t) {
				if (this.active || !d(t)) return void (a(t) && t.preventDefault());
				a(t) && t.preventDefault(), (this.active = !0);
				const e = t => {
					d(t) &&
						((this.active = !1), document.removeEventListener('keyup', e, !0));
				};
				document.addEventListener('keyup', e, !0);
			}
			#n(t) {
				d(t) && this.#t(t);
			}
			constructor(...t) {
				super(...t),
					this.addEventListener('click', t => this.#t(t)),
					this.addEventListener('mousedown', this.#e),
					this.addEventListener('keydown', this.#s),
					this.addEventListener('keyup', this.#n);
			}
		};
class o extends t(e).with(s, r, n) {
	static observedAttributes = [
		'data-trvt-context',
		'data-trvt-disabled',
		'data-trvt-readonly',
	];
	constructor() {
		super(),
			(this.trvtType = this.dataset.trvtType || 'button'),
			delete this.dataset.trvtType,
			(this.value = this.dataset.trvtValue || ''),
			delete this.dataset.trvtValue,
			(this.trvtContext = this.dataset.trvtContext || 'default'),
			(this.trvtDisabled = this.dataset.trvtDisabled || !1),
			(this.trvtReadonly = this.dataset.trvtReadonly || !1),
			(this.shadowStyleSheets = [i]),
			(this.template = this.#i());
	}
	#i() {
		return `\n\t\t\t<button \n\t\t\t\ttype="${this.trvtType}"\n\t\t\t\t${
			this.hidden ? ' hidden' : ''
		}\t\n\t\t\t\t${this.value ? ` value="${this.value}"` : ''}\n\t\t\t\t${
			this.trvtDisabled ? ' disabled' : ''
		}\n\t\t\t\t${this.trvtReadonly ? ' readonly' : ''}\n\t\t\t\t${
			this.id ? ` id="${this.id}"` : ''
		}\n\t\t\t\t${
			this.name ? ` name="${this.name}"` : ''
		} \n\t\t\t>\n\t\t\t\t<slot></slot>\n\t\t\t</button>\n\t\t`;
	}
}
customElements.define('trvt-button', o);
export { o as TrvtButton };
