import trvtStyles from 'trvt-styles';
import shadowStyles from './dropdown.css';
import { Features } from 'Features';
import createFragment from 'createFragment';


const menuItemStringFunction = data => `<li class="dropdown__item"><a class="dropdown__link" href="${data.url}">${data.text}</a></li>`;

const menuTemplateFunction = data => `
	<input type="checkbox" role="button" aria-haspopup="true" id="toggle" class="vh">
	<label for="toggle" data-opens-menu>
		&#x2630; Menu
		<span class="vh expanded-text">expanded</span>
		<span class="vh collapsed-text">collapsed</span>
	</label>
	<nav role="menu" class="dropdown__menu" data-menu-origin="left">
		<ul class="dropdown__list">${Features.renderString(data,menuItemStringFunction)}</ul>
	</nav>
`;

customElements.define('trvt-dropdown',
	class extends Features {
		constructor() {
			super();
			this.menu = JSON.parse(this.dataset.menu);
			this.template = createFragment(menuTemplateFunction(this.menu));
			this.attachShadow({ mode: 'open' });
			this.shadowRoot.adoptedStyleSheets = [trvtStyles, shadowStyles];
			this.shadowRoot.appendChild(this.template.cloneNode(true));
		}
	}
);
