import { styles } from '@trvt/core';
import articleCSS from './article.css' assert { type: 'css' };

export class TrvtArticle extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.adoptedStyleSheets = [...styles, articleCSS];
		this.title = undefined;
	}
	connectedCallback() {
		this.title = this.dataset.trvtTitle;
		this.shadowRoot.appendChild(this.render());
	}
	render() {
		return document.createRange().createContextualFragment(`
			<article>
        <h2>${this.title}</h2>
        <slot name="intro"></slot>
        <slot name="content"></slot>
        <slot name="footer"></slot>
			</article>
		`);
	}
}
customElements.define('trvt-article', TrvtArticle);
