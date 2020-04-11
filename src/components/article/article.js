import trvtStyles from 'trvt-styles';
import shadowStyles from './article.css';
import { Compositions, html } from 'Compositions';

customElements.define('trvt-article',
	class extends Compositions {
		constructor() {
			super();
			this.tag = 'article';
			this.attachShadow({ mode: 'open' });
			this.shadowRoot.adoptedStyleSheets = [trvtStyles, shadowStyles];
		}
	}
);
