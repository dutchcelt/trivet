// @ts-expect-error
import { TrivetElement } from '@trvt/core';
// @ts-expect-error
import articleCSS from './article.css' assert { type: 'css' };

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

/**
 * @class
 * @extends TrivetElement
 */
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

// @ts-expect-error
customElements.define('trvt-article', TrvtArticle);
