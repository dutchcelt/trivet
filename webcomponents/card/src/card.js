import { ContentElementClass } from '@trvt/core';
import cardCSS from './card.css' assert { type: 'css' };

export class TrvtCard extends ContentElementClass {
	constructor() {
		super();
		this.shadowRoot.adoptedStyleSheets = [cardCSS];
	}
}
customElements.define('trvt-card', TrvtCard);
