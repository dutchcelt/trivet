import layout from 'layout';
import trivetStyles from 'trivetStyles';

const template = document.createElement('template');
template.innerHTML = `
<section class="trvt-section">
	<header class="trvt-section__header"><slot name="title"></slot></header>
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
			shadowRoot.adoptedStyleSheets = [trivetStyles,layout];
			shadowRoot.appendChild(template.content.cloneNode(true));
		}

	}
);
