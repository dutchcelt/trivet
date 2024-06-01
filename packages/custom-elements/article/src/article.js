import { TrivetElement } from '@trvt/core';
// @ts-expect-error
import articleCSS from './article.css' with { type: 'css' };

/**
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
	/** @constructor */
	constructor() {
		super();
		/** @type {CSSStyleSheet[]} */
		this.shadowStyleSheets = articleCSS;

		/** @type {string} */
		this.template = contentTemplate;
	}
}

customElements.define('trvt-article', TrvtArticle);
