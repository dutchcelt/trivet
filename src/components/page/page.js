import shadowStyles from './page.css';
import { Compositions } from 'Compositions';

customElements.define('trvt-page',
	class extends Compositions {
		constructor() {
			super();
			this.attachShadow({ mode: 'open' });
			this.shadowRoot.adoptedStyleSheets = [shadowStyles];
			this.shadowRoot.appendChild(this.template.cloneNode(true));

		}
	}
);
