import { TrivetElement } from '@trvt/core';
import articleCSS from './article.css' assert { type: 'css' };

/**
 * contentTemplate
 * @type {string}
 */
const contentTemplate = `
	<article>
		<slot name="heading"></slot>
		<slot name="intro"></slot>
		<slot name="content"></slot>
		<slot name="footer"></slot>
		<slot></slot>
	</article>
`;

export class TrvtArticle extends TrivetElement {
	constructor() {
		super();
		this.shadowStyleSheets = articleCSS;
		this.template = contentTemplate;
	}
}
// @ts-ignore
customElements.define('trvt-article', TrvtArticle);
