import trvtStyles from 'trvt-styles';
import shadowStyles from './article.css';
import { Trivet, html } from 'Trivet';

customElements.define('trvt-article',
	class extends Trivet {
		constructor() {
			super();
		}
		render(){
			this.shadowRoot.adoptedStyleSheets = [trvtStyles, shadowStyles];
			return html`<article>${Trivet.composition()}</article>`
		}
	}
);
