import t from './styles-1714a140.css' assert { type: 'css' };
import e from './styles-cbbf372a.css' assert { type: 'css' };
import s from './styles-cd29e04f.css' assert { type: 'css' };
import r from './styles-eb16242b.css' assert { type: 'css' };
import n from './styles-4ef041fc.css' assert { type: 'css' };
import o from './styles-6fce9174.css' assert { type: 'css' };
const a = () => {
		const t = new CSSStyleSheet();
		try {
			return (
				t.insertRule('@layer test { \n\t\t:host { color: inherit }\n\t}', 0), !0
			);
		} catch (t) {
			return console.warn('Does not have layers'), !1;
		}
	},
	c = t => (/^\//.test(t) ? t : `/${t}`),
	l = async (t, e = '') => {
		let {
			family: s,
			filename: r,
			path: n,
			style: o,
			weight: a,
			display: l,
		} = t;
		if (!(Object.values(t).some(t => 'string' == typeof t) && s && r && n))
			throw new Error(
				'Missing font face information. Please check the token values.'
			);
		(n = c(n)), (r = c(r));
		const i = new URL(`${e + n}${r}`, import.meta.url);
		if (!i) throw new Error("Can't generate a URL");
		const m = new FontFace(s, `url(${i})`, {
			style: o,
			weight: a,
			display: l || 'auto',
		});
		await m.load(), document.fonts.add(m);
	},
	i = (t, e, s) => {
		const r = 1e3 / 60,
			n = e || 4 * r;
		let o = !1;
		const a = (...e) => {
			requestAnimationFrame(() => {
				t.apply(s, e), (o = !1);
			});
		};
		return (...t) => {
			o || (o = setTimeout(a, Math.max(0, n - r), ...t));
		};
	},
	m = t => {
		const e = document.createElement('style');
		(e.innerText = t), document.head.appendChild(e);
		const { sheet: s } = e;
		return document.head.removeChild(e), s;
	},
	u = (t, e) => {
		if (a())
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
	d = (t, e = 'unknown') => {
		t.forEach(async t => {
			let s;
			try {
				(s = new CSSStyleSheet()),
					await s.replace(t),
					document.adoptedStyleSheets.includes(s) ||
						document.adoptedStyleSheets.push(s);
			} catch (r) {
				(s = document.createElement('style')),
					(s.id = `${e}`),
					(s.textContent = t),
					document.head.appendChild(s);
			}
		});
	},
	p = [t, e, s, r, n, o];
export {
	m as CSSString2CSSStyleSheet,
	y as generateUUID,
	a as hasCSSLayerSupport,
	d as injectDocumentStyles,
	u as insertIntoCssLayer,
	l as loadFont,
	i as throttler,
	p as trivetCSS,
};
