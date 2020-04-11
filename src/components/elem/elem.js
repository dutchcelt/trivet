import shadowStyles from './elem.css';
import { Elements } from 'Elements';

customElements.define('trvt-elem',
	class extends Elements {
		constructor() {
			super();
			this.attachShadow({ mode: this.mode });
			this.shadowRoot.adoptedStyleSheets = [shadowStyles];
			Elements.appendDynamicTemplate(this);
		}
	}
);

