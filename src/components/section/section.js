import trvtStyles from 'trvt-styles';
import shadowStyles from './section.css';
import { Templates } from 'Templates';

customElements.define('trvt-section',
	class extends Templates {
		constructor() {
			super();
			this.attachShadow({ mode: 'open' });
			this.shadowRoot.adoptedStyleSheets = [trvtStyles, shadowStyles];
			this.shadowRoot.appendChild(this.template.cloneNode(true));
		}
	}
);
