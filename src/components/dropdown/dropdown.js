import trvtStyles from 'trvt-styles';
import shadowStyles from './dropdown.css';
import { Elements } from 'Elements';
import createFragment from 'createFragment';

const temp = `
	<input type="checkbox" role="button" aria-haspopup="true" id="toggle" class="vh">
	<label for="toggle" data-opens-menu>
		&#x2630; Menu
		<span class="vh expanded-text">expanded</span>
		<span class="vh collapsed-text">collapsed</span>
	</label>
	<div role="menu" data-menu-origin="left">
		<slot name="list"></slot>
	</div>
`;

customElements.define('trvt-dropdown',
	class extends Elements {
		constructor() {
			super();
			this.attachShadow({ mode: 'open' });
			this.shadowRoot.adoptedStyleSheets = [trvtStyles, shadowStyles];
			//this.template = createFragment(temp);
			this.shadowRoot.appendChild(createFragment(temp).cloneNode(true));
		}
	}
);
