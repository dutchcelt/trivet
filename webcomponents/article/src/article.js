import { ContentElementClass } from '@trvt/core';
import articleCSS from './article.css' assert { type: 'css' };

export class TrvtArticle extends ContentElementClass {
	constructor() {
		super();
		this.shadowRoot.adoptedStyleSheets = [articleCSS];
	}
}
customElements.define('trvt-article', TrvtArticle);
