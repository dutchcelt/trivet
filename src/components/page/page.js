import shadowStyles from './page.css';
import { Trivet } from 'Trivet';

customElements.define('trvt-page',
	class extends Trivet {
		constructor() {
			super();
		}
		render(){
			this.shadowRoot.adoptedStyleSheets = [shadowStyles];
			return Trivet.composition();
		}
	}
);
