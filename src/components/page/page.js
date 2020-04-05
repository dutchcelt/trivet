import shadowStyles from './page.css';
import { Compositions } from 'Compositions';
import createFragment from 'createFragment';

const templateString = `
	<slot name="navigation"></slot>
`;

customElements.define('trvt-page',
	class extends Compositions {
		constructor() {
			super();
			this.attachShadow({ mode: 'open' });
			this.shadowRoot.adoptedStyleSheets = [shadowStyles];
			this.pageTemplateString = templateString + this.templateString;
			this.template = createFragment(this.pageTemplateString);
			this.shadowRoot.appendChild(this.template.cloneNode(true));

		}
	}
);
