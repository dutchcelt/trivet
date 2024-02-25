import { trivetCSS as t, loadFont as e } from '@trvt/assets';
export { trivetCSS as styles } from '@trvt/assets';
const s = (t, e = !0) => {
	const s = `${(function (t, e) {
		function s() {
			return (
				new DOMParser().parseFromString(t, 'text/html').body ||
				document.createElement('body')
			);
		}
		function r(t) {
			let e = t.querySelectorAll('script');
			for (let t of e) t.remove();
		}
		function n(t, e) {
			let s = e.replace(/\s+/g, '').toLowerCase();
			return (
				!(
					!['src', 'href', 'xlink:href'].includes(t) ||
					(!s.includes('javascript:') && !s.includes('data:'))
				) ||
				!!t.startsWith('on') ||
				void 0
			);
		}
		function a(t) {
			let e = t.attributes;
			for (let { name: s, value: r } of e) n(s, r) && t.removeAttribute(s);
		}
		function o(t) {
			let e = t.children;
			for (let t of e) a(t), o(t);
		}
		let i = s();
		return r(i), o(i), e ? i.childNodes : i.innerHTML;
	})(t, !1)}`;
	return e ? document.createRange().createContextualFragment(s) : s;
};
const r = {
	dark: window.matchMedia('(prefers-color-scheme: dark)'),
	light: window.matchMedia('(prefers-color-scheme: light)'),
	_active: void 0,
	get current() {
		const t = r.dark.matches && 'dark',
			e = r.light.matches && 'light';
		return r._active || t || e;
	},
	set current(t) {
		r._active = t;
	},
};
r.dark.addEventListener('change', () => a()),
	r.light.addEventListener('change', () => a());
const n = t => 'string' == typeof t && /light|dark/.test(t);
function a(t = '', e = document.documentElement) {
	const { dataset: s } = e;
	s.colorScheme = n(t) ? t : r.current;
}
const o = t[0].cssRules[0].nameList;
class i extends HTMLElement {
	#t;
	#e;
	#s;
	#r() {
		a(r.current), (this.#t.innerHTML = this.template);
	}
	get shadow() {
		return this.#t;
	}
	get shadowFragment() {
		return this.shadow.querySelector('*');
	}
	get shadowStyleSheets() {
		return this.#e;
	}
	set shadowStyleSheets(t) {
		const e = [t].flat();
		for (const t of e) {
			const e = this.shadow.adoptedStyleSheets;
			e.includes(t) || (this.shadow.adoptedStyleSheets = [...e, t]);
		}
	}
	set hostCssProperties(t) {
		const e = new CSSStyleSheet(),
			s = this.shadow.adoptedStyleSheets;
		e.replaceSync(`:host { ${t.join(';')} }`),
			s.includes(e) || (this.shadow.adoptedStyleSheets = [...s, e]);
	}
	get template() {
		return this.#s;
	}
	set template(t) {
		(this.#s = `${s(t, !1)}`), this.#r();
	}
	constructor() {
		super(),
			(this.settings = { mode: 'closed', delegatesFocus: !0 }),
			(this.#t = this.attachShadow(this.settings)),
			(this.shadowStyleSheets = [...t]);
	}
}
const c = t => {
		const e = document.createElement('div');
		return (e.innerText = t), e.innerHTML;
	},
	l = (t, e, s = {}) => {
		Object.defineProperty(t, e, {
			enumerable: !1,
			configurable: !0,
			writable: !0,
			value: {
				data: { ...s },
				get detail() {
					return this.data;
				},
			},
		});
	};
const h = new (class {
		#n;
		constructor() {
			(this.#n = document.createElement('div')), (this.store = {});
		}
		register(t, e) {
			const s = t || 'anonymous';
			this[s]
				? console.warn(`Can't register event '${s}' because it already exists.`)
				: (l(this, s), this.#n.addEventListener(s, e));
		}
		remove(t, e) {
			this[t]
				? this.#n.removeEventListener(t, e)
				: console.warn(
						`Can't remove event '${t}' because it hasn't been registered.`
				  );
		}
		fire(t, e = {}) {
			this[t]
				? ((e = Object.assign(
						this[t].data,
						(t => {
							const e = {};
							for (const [s, r] of Object.entries(t)) {
								const n = typeof t[s];
								/string|boolean|number/.test(n)
									? (e[s] = 'string' === n ? c(r) : r)
									: console.warn(
											`Trivet: Detail property '${s}' of type '${n}' is prohibited and has been removed`
									  );
							}
							return e;
						})(e)
				  )),
				  this.#n.dispatchEvent(new CustomEvent(t, { detail: e })))
				: console.warn(
						`Can't fire event '${t}' because it hasn't been registered.`
				  );
		}
	})(),
	d = (t, s) => {
		(Array.isArray(t) ? t : Object.keys(t).map(e => t[e])).forEach(t =>
			e(t, s)
		);
	},
	u = t =>
		class extends t {
			#a;
			#o;
			static formAssociated = !0;
			get value() {
				return this.#o;
			}
			set value(t) {
				(this.#o = t), this.#a.setFormValue(this.#o);
			}
			get form() {
				return this.#a.form;
			}
			get name() {
				return this.getAttribute('name');
			}
			get componentTagName() {
				return this.localName;
			}
			get formElement() {
				return this.shadow.querySelector('input, button, textarea');
			}
			get isSubmit() {
				return (
					this.formElement.hasAttribute('type') &&
					'submit' === this.formElement.getAttribute('type')
				);
			}
			get validity() {
				return this.#a.validity;
			}
			get validationMessage() {
				return this.#a.validationMessage;
			}
			get willValidate() {
				return this.#a.willValidate;
			}
			checkValidity() {
				return this.#a.checkValidity();
			}
			reportValidity() {
				return this.#a.reportValidity();
			}
			formDataToJSON(t) {
				const e = {};
				return (
					t.forEach(function (t, s) {
						e[s] = t;
					}),
					JSON.stringify(e)
				);
			}
			constructor(...t) {
				super(...t), (this.#o = void 0);
			}
		},
	m = t =>
		class extends t {
			attributeChangedCallback(...t) {
				const [e, s, r] = t;
				if (null === s || s !== r)
					switch (e) {
						case 'data-trvt-context':
							(this.trvtContext = r), this.#i();
							break;
						case 'data-trvt-disabled':
							this.shadowFragment.disabled = 'true' === r;
							break;
						case 'data-trvt-readonly':
							this.shadowFragment.readonly = 'true' === r;
					}
			}
			#i() {
				const t = this.shadowFragment.tagName.toLowerCase();
				this.contextCSS.replaceSync(
					`\n\t\t\t\t@layer components.modifier {\n\t\t\t\t\t${t} {\n\t\t\t\t\t\t--_context: var(--_context-${this.trvtContext});\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t`
				);
			}
			connectedCallback() {
				this.shadowStyleSheets = this.contextCSS;
			}
			constructor(...t) {
				super(...t), (this.contextCSS = new CSSStyleSheet());
			}
		},
	g = t => new v(t);
class v {
	constructor(t) {
		this.superclass = t || class {};
	}
	with(...t) {
		return t.reduce((t, e) => e(t), this.superclass);
	}
}
export {
	u as FormMixin,
	m as ReactiveMixin,
	i as TrivetElement,
	a as activateColorScheme,
	r as colorScheme,
	s as createFragment,
	o as cssLayerDefinitions,
	h as dataBus,
	d as fontsLoader,
	g as mix,
};
