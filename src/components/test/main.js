import trivetStyles from 'trivetStyles';
import styleTest from './shadow.css';
import {appendDynamicTemplate, atoms} from 'atoms';

customElements.define('trvt-test-elem',
	class extends atoms {
		constructor() {
			super();
			appendDynamicTemplate(this);
			this.shadowRoot.adoptedStyleSheets = [trivetStyles, styleTest];
		}
	}
);

