import { TrivetElement } from '@trvt/core';
import cardCSS from './card.css' assert { type: 'css' };

const contentTemplate = `
	<article>
		<slot name="heading"></slot>
		<slot name="intro"></slot>
		<slot name="content"></slot>
		<slot name="footer"></slot>
		<slot></slot>
	</article>
`;

export class TrvtCard extends TrivetElement {
	constructor() {
		super();
		this.shadowStyleSheets = [cardCSS];
		this.template = contentTemplate;
	}
}
customElements.define('trvt-card', TrvtCard);
