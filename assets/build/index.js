import t from './styles-1714a140.css' assert { type: 'css' };
import e from './styles-e1c98b8b.css' assert { type: 'css' };
import s from './styles-a88daf3c.css' assert { type: 'css' };
import r from './styles-eb16242b.css' assert { type: 'css' };
import n from './styles-0402a57a.css' assert { type: 'css' };
import a from './styles-45b838e5.css' assert { type: 'css' };
const o = () => {
		const t = new CSSStyleSheet();
		try {
			return (
				t.insertRule('@layer test { \n\t\t:host { color: inherit }\n\t}', 0), !0
			);
		} catch (t) {
			return console.warn('Does not have layers'), !1;
		}
	},
	c = async (t, e = '') => {
		let {
			family: s,
			filename: r,
			path: n,
			style: a,
			weight: o,
			display: c,
			variationSettings: l,
		} = t;
		if ((Object.values(t).some(t => 'string' == typeof t), n)) {
			/^\//.test(n) || (n = `/${n}`), /^\//.test(r) || (r = `/${r}`);
			const t = new URL(`${e + n}${r}`, import.meta.url);
			if (t) {
				const e = new FontFace(s, `url(${t})`, {
					style: a,
					weight: o,
					variationSettings: l || 'normal',
					display: c || 'auto',
				});
				await e.load(), document.fonts.add(e);
			}
		}
	},
	l = (t, e, s) => {
		const r = 1e3 / 60,
			n = e || 4 * r;
		let a = !1;
		const o = (...e) => {
			requestAnimationFrame(() => {
				t.apply(s, e), (a = !1);
			});
		};
		return (...t) => {
			a || (a = setTimeout(o, Math.max(0, n - r), ...t));
		};
	},
	i = t => {
		const e = document.createElement('style');
		(e.innerText = t), document.head.appendChild(e);
		const { sheet: s } = e;
		return document.head.removeChild(e), console.log(s), s;
	},
	m = (t, e) => {
		if (o())
			return t.forEach(t => {
				let s = [...t.cssRules].reduce((t, e) => t + e.cssText, '');
				t.replace(`\n\t\t\t@layer ${e} {\n\t\t\t\t${s}\n\t\t\t}`);
			});
	},
	y = () => {
		function t(t) {
			var e = (Math.random().toString(16) + '000000000').substr(2, 8);
			return t ? '-' + e.substr(0, 4) + '-' + e.substr(4, 4) : e;
		}
		return t() + t(!0) + t(!0) + t();
	},
	u = (t, e = 'unknown') => {
		t.forEach(async t => {
			let s;
			try {
				(s = new CSSStyleSheet()),
					await s.replace(t),
					(document.adoptedStyleSheets = s);
			} catch (r) {
				(s = document.createElement('style')),
					(s.id = `${e}`),
					(s.textContent = t),
					document.head.appendChild(s);
			}
		});
	},
	p = [t, e, s, r, n, a];
export {
	i as CSSString2CSSStyleSheet,
	y as generateUUID,
	o as hasCSSLayerSupport,
	u as injectDocumentStyles,
	m as insertIntoCssLayer,
	c as loadFont,
	l as throttler,
	p as trivetCSS,
};
