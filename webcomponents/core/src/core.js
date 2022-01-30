import { trvtTokensFontfaces, trvtTokensCSS } from '@trvt/designtokens';
import trvtCSS from './trivet.css' assert { type: 'css' };

import reset from 'the-new-css-reset' assert { type: 'css' };
import normalize from 'normalize.css' assert { type: 'css' };
import coreCSS from './core.css' assert { type: 'css' };
import trvtIcons from '../assets/trvt-icons-v1.0/style.css' assert { type: 'css' };

wrapWithlayerStatementBlock([reset, normalize], 'reset');
wrapWithlayerStatementBlock([trvtTokensCSS, coreCSS, trvtCSS], 'designsystem');

const { base, baseItalic, display, gui, icons } = trvtTokensFontfaces.font.face;

const fontArray = [base, baseItalic, display, gui, icons].map((f) => !!f && f);

fontArray.forEach((face) => loadFont(face));

async function loadFont({ family, filename, path, style, weight, display }) {
	const valid = [family, filename, path, style, weight].some((f) => !!f.value && typeof f.value === 'string');
	if (valid) {
		const url = new URL(`${path.value}${filename.value}`, import.meta.url);
		if (url) {
			const font = new FontFace(family.value, `url(${url})`, {
				style: style.value,
				weight: weight.value,
				display: display.value || auto,
			});
			await font.load();
			document.fonts.add(font);
		} else {
			new Error("Can't generate a URL");
		}
	} else {
		new Error('Missing font face information. Please check the token values.');
	}
}

function hasCSSLayerSupport() {
	const stylesheet = new CSSStyleSheet();
	const layer = 'test';
	stylesheet.insertRule(`@layer ${layer} { element { color: inherit;}}`, 0);
	return stylesheet.cssRules[0].name === 'test';
}

function wrapWithlayerStatementBlock(sheets, layer) {
	hasCSSLayerSupport() &&
		sheets.forEach((sheet) => {
			let cssText = [...sheet.cssRules].reduce((acc, rule) => (acc += rule.cssText), '');
			sheet.replaceSync(`
			@layer ${layer} {
				${cssText}
			}`);
		});
}

const styles = [reset, normalize, coreCSS, trvtIcons];
document.adoptedStyleSheets = [trvtTokensCSS, trvtCSS];

export { loadFont, trvtCSS, styles };
