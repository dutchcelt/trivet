import trivetStyles from 'trivetStyles';
import shadowStyles from './shadow.css';
import {templates} from 'templates';

customElements.define('trvt-templates',
	class extends templates {
		constructor() {
			super();
			this.shadowRoot.appendChild(this.template);
			this.shadowRoot.adoptedStyleSheets = [trivetStyles, shadowStyles];
		}
	}
);
