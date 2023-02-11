import { styles, createFragment } from '@trvt/core';
import cardCSS from './card.css' assert { type: 'css' };

export class TrvtCard extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.adoptedStyleSheets = [...styles, cardCSS];
		this.compTitle = this.dataset?.compTitle || ``;
		this.shadowRoot.appendChild(this.render());
	}
	render() {
		return createFragment(`
			<article>	
				${this.compTitle && `<h2>${this.compTitle}</h2>`}
				<slot></slot>
			</article>
		`);
	}
}
customElements.define('trvt-card', TrvtCard);
