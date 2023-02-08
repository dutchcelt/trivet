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
import { indexCSS } from '@trvt/assets';
import { defaultsCSS } from '@trvt/assets';
import { trivetCSS } from '@trvt/assets';
const styles = [indexCSS, defaultsCSS, trivetCSS];

export { styles };
