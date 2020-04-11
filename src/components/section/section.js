import trvtStyles from 'trvt-styles';
import shadowStyles from './section.css';
import { Compositions } from 'Compositions';

customElements.define('trvt-section',
	class extends Compositions {
		constructor() {
			super();
			this.tag = 'section';
			this.attachShadow({ mode: 'open' });
			this.shadowRoot.adoptedStyleSheets = [trvtStyles, shadowStyles];
		}
	}
);
