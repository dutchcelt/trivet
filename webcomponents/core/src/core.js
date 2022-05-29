/* Design Tokens */
import { trvtTokensFontfaces } from '@trvt/designtokens';

/* Register event to prevent FOUC */
import { dataBus } from './dataBus.js';
const componentLoadedEvent = (event) => {
	if (event.detail.loaded === true) {
		document.body.dataset.loaded = 'true';
		dataBus.remove('componentLoaded', componentLoadedEvent);
	}
};
dataBus.register('componentLoaded', componentLoadedEvent);

/* Base styles for all Trivet Components */
//import coreCSS from './core.css' assert { type: 'css' };
import { normalizeCSS, trivetCSS as coreCSS } from '@trvt/assets';
const styles = [normalizeCSS, coreCSS];

export { styles };
