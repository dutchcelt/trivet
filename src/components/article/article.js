import trvtStyles from 'trvt-styles';
import shadowStyles from './article.css';
import { Compositions, html } from 'Compositions';


const template = () => html`
	<article>
		<slot name="header"></slot>
		<slot name="content"></slot>
		<slot name="footer"></slot>
	</article>
`;

customElements.define('trvt-article',
	class extends Compositions {
		constructor() {
			super();
			this.attachShadow({ mode: this.mode });
			this.shadowRoot.adoptedStyleSheets = [trvtStyles, shadowStyles];
			this.template = template;
		}
	}
);
