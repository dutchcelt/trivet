import shadowStyles from './elem.css';
import { Elements } from 'Elements';

customElements.define('trvt-elem',
	class extends Elements {
		constructor() {
			super();
			this.attachShadow({ mode: 'open' });
			this.shadowRoot.adoptedStyleSheets = [shadowStyles];
			Atoms.appendDynamicTemplate(this);
		}
	}
);

