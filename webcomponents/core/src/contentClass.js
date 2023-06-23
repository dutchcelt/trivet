import { styles, createFragment } from '@trvt/core';

export class ContentElementClass extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.adoptedStyleSheets = [...styles];
		this.shadowRoot.appendChild(this.render());
	}

	render() {
		return createFragment(`
			<article>
				<slot name="heading"></slot>
				<slot name="intro"></slot>
        		<slot name="content"></slot>
				<slot name="footer"></slot>
				<slot></slot>
			</article>
		`);
	}
}
