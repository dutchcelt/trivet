import templateStyles from 'templateStyles';
import shadowStyles from './page.css';
import { Pages } from 'Pages';

customElements.define('trvt-page',
	class extends Pages {
		constructor() {
			super();
			this.attachShadow({ mode: 'open' });
			this.shadowRoot.adoptedStyleSheets = [templateStyles, shadowStyles];
			this.shadowRoot.appendChild(this.template.cloneNode(true));

		}
	}
);
