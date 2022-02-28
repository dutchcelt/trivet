/* Trivet assets */
import {
	insertIntoCssLayer,
	loadFont,
	normalizeCSS,
} from '@trvt/assets';


/* Design Tokens */
import {trvtTokensFontfaces} from '@trvt/designtokens';

/* Load the font configs in our tokens and load the ones present */
const {base, baseItalic, display, gui} = trvtTokensFontfaces.font.face;
const fontArray = [base, baseItalic, display, gui].map((f) => !!f && f);
fontArray.forEach((face) => loadFont(face));


/* Base styles for all Trivet Components */
import coreCSS from './core.css' assert {type: 'css'};

const styles = [normalizeCSS, coreCSS];

export {loadFont, styles, insertIntoCssLayer};
