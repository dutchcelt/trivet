import trvtStyles from 'trvt-styles';
import shadowStyles from './dropdown.css';
//import { Templates } from 'Templates';
import { Atomic } from 'Atomic';
import createFragment from 'createFragment';

const temp = `
	<input type="checkbox" role="button" aria-haspopup="true" id="toggle" class="vh">
	<label for="toggle" data-opens-menu>
		&#x2630; Menu
		<span class="vh expanded-text">expanded</span>
		<span class="vh collapsed-text">collapsed</span>
	</label>
	<slot name="list"></slot>
`;

customElements.define('trvt-dropdown',
	class extends Atomic {
		constructor() {
			super();
			this.attachShadow({ mode: 'open' });
			this.template = createFragment(temp);
			this.shadowRoot.appendChild(this.template.cloneNode(true));
			this.shadowRoot.adoptedStyleSheets = [trvtStyles, shadowStyles];
		}
	}
);


/*

<trvt-dropdown>
	<input type="checkbox" role="button" aria-haspopup="true" id="toggle" class="vh">
	<label for="toggle" data-opens-menu>
		&#x2630; Menu
	<span class="vh expanded-text">expanded</span>
	<span class="vh collapsed-text">collapsed</span>
	</label>
	<div role="menu" data-menu-origin="left">
		<ul>
			<li><a href="#">Home</a></li>
			<li><a href="#">About</a></li>
			<li><a href="#">Contact</a></li>
		</ul>
	</div>
</trvt-dropdown>

*/
