import { styles, bus } from '@trvt/core';
import articleCSS from './article.css' assert { type: 'css' };

export class TrvtArticle extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.adoptedStyleSheets = [...styles, articleCSS];
		this.trvtTitle = this.dataset.trvtTitle;
		this.trvtLayout = undefined;
	}
	connectedCallback() {
		// Retrieve Layout type from the global eventbus
		bus.fire('trvtLayout', { component: this });
		this.shadowRoot.appendChild(this.render());
	}
	render() {
		return document.createRange().createContextualFragment(`
			<article>
        ${this.__headingTemplate()}
        <slot name="intro"></slot>
        <slot name="content"></slot>
        <slot name="aside"></slot>
        <slot name="footer"></slot>
			</article>
		`);
	}
	__headingTemplate() {
		const tag = this.trvtLayout === 'article' ? 'h1' : 'h2';
		return this.trvtTitle ? `<${tag}>${this.trvtTitle}</${tag}>` : ``;
	}
}
customElements.define('trvt-article', TrvtArticle);
