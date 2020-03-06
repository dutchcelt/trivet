import layout from 'layout';
import trivetStyles from 'trivetStyles';

const template = document.createElement('template');
template.innerHTML = `
	<h1>
		<slot name="title"></slot>
	</h1>
	<slot name="layout" class="layout"></slot>
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
