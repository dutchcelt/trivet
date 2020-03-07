import layoutStyles from 'layoutStyles';
import trivetStyles from 'trivetStyles';
import insertTemplate from 'insertTemplate';

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
			const el = this;
			const shadowRoot = el.attachShadow({mode: 'open'});
			const template = insertTemplate(templateString);
			shadowRoot.adoptedStyleSheets = [trivetStyles,layoutStyles];
			shadowRoot.appendChild(template.cloneNode(true));
		}

	}
);
