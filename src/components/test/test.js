import shadowStyles from './test.css';
import { Atoms } from 'atoms';

customElements.define('trvt-elem',
	class extends Atoms {
		constructor() {
			super();
			this.attachShadow({ mode: 'open' });
			this.shadowRoot.adoptedStyleSheets = [shadowStyles];
			Atoms.appendDynamicTemplate(this);

		}
	}
);

