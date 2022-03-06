/* Design Tokens */
import { trvtTokensFontfaces } from '@trvt/designtokens';

/* Load the font configs in our tokens and load the ones present */
import { loadFont } from '@trvt/assets';
const { base, baseItalic, display, gui } = trvtTokensFontfaces.font.face;
const fontArray = [base, baseItalic, display, gui].map((f) => !!f && f);
fontArray.forEach((face) => loadFont(face));

/* Register event to prevent FOUC */
import { bus } from './eventbus.js';
const componentLoadedEvent = (event) => {
	if( event.detail.loaded === true) {
		document.body.dataset.loaded = 'true';
		bus.remove('componentLoaded', componentLoadedEvent);
	}
}
bus.register('componentLoaded', componentLoadedEvent);

/* Base styles for all Trivet Components */
import coreCSS from './core.css' assert { type: 'css' };
import { normalizeCSS } from '@trvt/assets';
export const styles = [normalizeCSS, coreCSS];
