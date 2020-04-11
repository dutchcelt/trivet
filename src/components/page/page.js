import shadowStyles from './page.css';
import { Compositions, html } from 'Compositions';

const template = () => html`
	<slot name="navigation"></slot>
	<slot name="header"></slot>
	<slot name="content"></slot>
	<slot name="footer"></slot>
`;

customElements.define('trvt-page',
	class extends Compositions {
		constructor() {
			super();
			this.attachShadow({ mode: this.mode });
			this.shadowRoot.adoptedStyleSheets = [shadowStyles];
			this.template = template;
		}
	}
);
