import trvtStyles from 'trvt-styles';
import shadowStyles from './dropdown.css';
import { Features, html, render } from 'Features';
import { repeat } from 'repeat';

const menuTemplateFunction = data => html`
	<input type="checkbox" role="button" aria-haspopup="true" id="toggle" class="hide">
	<label for="toggle" data-opens-menu>
		&#x2630; Menu
		<span class="hide expanded-text">expanded</span>
		<span class="hide collapsed-text">collapsed</span>
	</label>
	<nav role="menu" class="dropdown__menu" data-menu-origin="left">
		<ul class="dropdown__list">
 			${repeat(
 				data,
				item => html`
					<li class="dropdown__item">
						<a class="dropdown__link" href="${item.url}">
							${item.text}
						</a>
					</li>
				`
			)}
		</ul>
	</nav>
`;

customElements.define('trvt-dropdown',
	class extends Features {
		constructor() {
			super();
			this.template = menuTemplateFunction(JSON.parse(this.dataset.menu));
			this.attachShadow({ mode: 'open' });
			this.shadowRoot.adoptedStyleSheets = [trvtStyles, shadowStyles];
			render(this.template, this.shadowRoot);
		}
	}
);
