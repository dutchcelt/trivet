import layout from 'layout';
import trivetStyles from 'trivetStyles';
import { createFragment } from 'insertTemplate';

const template = createFragment(`
<template>
	<h1>
		<slot name="title"></slot>
	</h1>
	<slot name="layout" class="layout"></slot>
</template>
`);

customElements.define('trvt-layout',
	class extends HTMLElement {
		constructor() {
			super();
			const el = this;
			const shadowRoot = el.attachShadow({mode: 'open'})
			shadowRoot.adoptedStyleSheets = [trivetStyles,layout];
			shadowRoot.appendChild(template.content.cloneNode(true));
		}

	}
);
