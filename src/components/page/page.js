import shadowStyles from './page.css';
import { Compositions, html } from 'Compositions';

customElements.define('trvt-page',
	class extends Compositions {
		constructor() {
			super();
			this.attachShadow({ mode: 'open' });
			this.shadowRoot.adoptedStyleSheets = [shadowStyles];
		}
	}
);
