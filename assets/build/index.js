import t from './styles-1714a140.css' assert { type: 'css' };
import e from './styles-146e029c.css' assert { type: 'css' };
import s from './styles-6bdc1398.css' assert { type: 'css' };
import n from './styles-eb16242b.css' assert { type: 'css' };
import r from './styles-0402a57a.css' assert { type: 'css' };
import o from './styles-56020156.css' assert { type: 'css' };
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
	c = async (t, e = '') => {
		let {
			family: s,
			filename: n,
			path: r,
			style: o,
			weight: a,
			display: c,
			variationSettings: l,
		} = t;
		if ((Object.values(t).some(t => 'string' == typeof t), r)) {
			/^\//.test(r) || (r = `/${r}`), /^\//.test(n) || (n = `/${n}`);
			const t = new URL(`${e + r}${n}`, import.meta.url);
			if (t) {
				const e = new FontFace(s, `url(${t})`, {
					style: o,
					weight: a,
					variationSettings: l || 'normal',
					display: c || 'auto',
				});
				await e.load(), document.fonts.add(e);
			}
		}
	},
	l = (t, e, s) => {
		const n = 1e3 / 60,
			r = e || 4 * n;
		let o = !1;
		const a = (...e) => {
			requestAnimationFrame(() => {
				t.apply(s, e), (o = !1);
			});
		};
		return (...t) => {
			o || (o = setTimeout(a, Math.max(0, r - n), ...t));
		};
	},
	i = t => {
		const e = document.createElement('style');
		(e.innerText = t), document.head.appendChild(e);
		const { sheet: s } = e;
		return document.head.removeChild(e), console.log(s), s;
	},
	m = (t, e) => {
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
	u = (t, e = 'unknown') => {
		t.forEach(async t => {
			let s;
			try {
				(s = new CSSStyleSheet()),
					await s.replace(t),
					document.adoptedStyleSheets.includes(s) ||
						document.adoptedStyleSheets.push(s);
			} catch (n) {
				(s = document.createElement('style')),
					(s.id = `${e}`),
					(s.textContent = t),
					document.head.appendChild(s);
			}
		});
	},
	d = [t, e, s, n, r, o];
export {
	i as CSSString2CSSStyleSheet,
	y as generateUUID,
	a as hasCSSLayerSupport,
	u as injectDocumentStyles,
	m as insertIntoCssLayer,
	c as loadFont,
	l as throttler,
	d as trivetCSS,
};
