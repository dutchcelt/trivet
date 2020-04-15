import shadowStyles from './heading.css';
import { Elements } from 'Elements';

customElements.define('trvt-heading',
	class extends Elements {
		constructor() {
			super();
			this.attachShadow({ mode: 'open' });
			this.shadowRoot.adoptedStyleSheets = [shadowStyles];
			if(/span/i.test(this.tag)) this.tag = 'H1';
			this.block = 'heading'
			this.text = this.getAttribute('text');
		}
	}
);

