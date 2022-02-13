/* Design Tokens */
import { trvtTokensCSS, trvtTokensFontfaces } from '@trvt/designtokens';

/* Trivet assets */
import { insertIntoCssLayer, loadFont } from '@trvt/assets';
import coreCSS from './core.css' assert { type: 'css' };

insertIntoCssLayer([trvtTokensCSS], 'designsystem');

const { base, baseItalic, display, gui } = trvtTokensFontfaces.font.face;

const fontArray = [base, baseItalic, display, gui].map((f) => !!f && f);

fontArray.forEach((face) => loadFont(face));

const styles = [coreCSS];
document.adoptedStyleSheets = [trvtTokensCSS];

export { loadFont, styles, insertIntoCssLayer };
