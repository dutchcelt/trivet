import { trvtTokensFontfaces, trvtTokensCSS } from '@trvt/designtokens';

import normalise from '../assets/styles/normalize.css' assert { type: 'css' };
import coreCSS from './core.css' assert { type: 'css' };
import trvtIcons from '../assets/trvt-icons-v1.0/style.css' assert { type: 'css' };

const { base, baseItalic, display, gui, icons } = trvtTokensFontfaces.font.face;

base && loadFont(base);
baseItalic && loadFont(baseItalic);
display && loadFont(display);
gui && loadFont(gui);
icons && loadFont(icons);

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

const styles = [normalise, coreCSS, trvtIcons];
document.adoptedStyleSheets = [...styles];

export { loadFont, styles };
