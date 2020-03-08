import layoutStyles from './layout.css';
import trivetStyles from 'trivetStyles';
import createFragment from 'createFragment';

const alertElement = `<trvt-test-elem tag="h3" text="This is a notification"></trvt-test-elem>`;

const templateString = `
<section class="trvt-section">
	<header class="trvt-section__header"><slot name="header"></slot></header>
	<div class="trvt-section__layout"><slot name="content"></slot></div>
	<footer class="trvt-section__footer"><slot name="footer"></slot></footer>
</section>
`;

customElements.define('trvt-layout',
	class extends HTMLElement {
		constructor() {
			super();
			this.attachShadow({ mode: 'open' });
			this.template = createFragment(alertElement, templateString);
			this.shadowRoot.adoptedStyleSheets = [trivetStyles, layoutStyles];
			this.shadowRoot.appendChild(this.template);

		}
	}
);
