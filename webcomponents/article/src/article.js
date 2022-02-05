import { styles, insertIntoCssLayer } from '@trvt/core';
import articleCSS from './article.css' assert { type: 'css' };

insertIntoCssLayer([articleCSS], 'component');

export class TrvtArticle extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.adoptedStyleSheets = [...styles, articleCSS];
	}
	connectedCallback() {
		this.shadowRoot.appendChild(this.render());
	}
	render() {
		return document.createRange().createContextualFragment(`
			<article>
        <h2><slot name="title"></slot></h2>
        <p class="trvt-intro"><slot name="intro"></slot></p>
        <h3><slot name="subhead"></slot></h3>
        <div><slot name="content"></slot></div>
        <div><slot name="footer"></slot></div>
			</article>
		`);
	}
}
customElements.define('trvt-article', TrvtArticle);
