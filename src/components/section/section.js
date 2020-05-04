import trvtStyles from 'trvt-styles';
import shadowStyles from "./section.css";
import { Trivet } from 'Trivet';

customElements.define('trvt-section',
	class extends Trivet {
		constructor() {
			super();
		}
		render(){
			this.shadowRoot.adoptedStyleSheets = [trvtStyles, shadowStyles];
			return Trivet.composition();
		}
	}
);
