import shadowStyles from "trvt-section/section.css";
import { Trivet } from 'Trivet';
import tokens from 'trvt-section/design-tokens.json';

customElements.define('trvt-section',
	class extends Trivet {
		constructor() {
			super();
		}

		render(){
			this.composeTrivetStyles(shadowStyles,tokens);
			return Trivet.compositions(['header'],['content'],['footer']);
		}
	}
);
