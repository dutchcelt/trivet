import { styles, dataBus } from '@trvt/core';
import articleCSS from './article.css' assert { type: 'css' };

export class TrvtArticle extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.adoptedStyleSheets = [...styles, articleCSS];
		this.trvtTitle = this.dataset.trvtTitle;
		this.trvtLayout = dataBus.getDetail('trvtLayout', 'type');
	}
	connectedCallback() {
		this.shadowRoot.appendChild(this.render());
	}
	render() {
		return document.createRange().createContextualFragment(`
			<article>
        ${this.__headingTemplate()}
        <slot name="intro"></slot>
        ${this.__contentTemplate()}
        <slot name="footer"></slot>
			</article>
		`);
	}
	__headingTemplate() {
		const tag = this.trvtLayout === 'article' ? 'h1' : 'h2';
		return this.trvtTitle ? `<${tag}>${this.trvtTitle}</${tag}>` : ``;
	}
	__contentTemplate() {
		return this.trvtLayout === 'article'
			? `<slot name="content"></slot><slot name="aside"></slot>`
			: ``;
	}

}
customElements.define('trvt-article', TrvtArticle);
