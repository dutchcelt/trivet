import shadowStyles from './heading.css';
import { Elements } from 'Elements';

customElements.define('trvt-heading',
	class extends Elements {
		constructor() {
			super();
			this.attachShadow({ mode: this.mode });
			this.shadowRoot.adoptedStyleSheets = [shadowStyles];
			if(/span/i.test(this.tag)) this.tag = 'H1';
			Elements.appendDynamicTemplate(this);
		}
	}
);

