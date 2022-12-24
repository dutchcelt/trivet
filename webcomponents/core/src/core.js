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
import { trivetCSS } from '@trvt/assets';
import { normalizeCSS } from '@trvt/assets';
import coreCSS from './core.css' assert { type: 'css' };
const styles = [normalizeCSS, trivetCSS, coreCSS];

export { styles };
