import trivetStyles from 'trivetStyles';
import templateStyles from 'templateStyles';
import shadowStyles from './section.css';
import { templates } from 'templates';

customElements.define('trvt-section',
	class extends templates {
		constructor() {
			super();
			this.attachShadow({ mode: 'open' });
			this.shadowRoot.adoptedStyleSheets = [trivetStyles, templateStyles, shadowStyles];
			this.shadowRoot.appendChild(this.template.cloneNode(true));
		}
	}
);
