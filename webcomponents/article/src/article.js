import { styles, createFragment } from '@trvt/core';
import articleCSS from './article.css' assert { type: 'css' };

export class TrvtArticle extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.adoptedStyleSheets = [...styles, articleCSS];
		this.trvtTitle = this.dataset.trvtTitle;
		this.layoutType = 'article';
		this.shadowRoot.appendChild(this.render());
	}
	connectedCallback() {}

	render() {
		return createFragment(`
			<article class="component content">
        ${this.#headingTemplate()}
        <slot name="intro"></slot>
        <slot name="content"></slot>
        <slot name="footer"></slot>
			</article>
		`);
	}

	/**
	 * Article on Article pages should have an H1 header otherwise it should be an H2
	 * @returns {string}
	 * @private
	 */
	#headingTemplate() {
		const tag = this.layoutType === 'article' ? 'h1' : 'h2';
		return this.trvtTitle ? `<${tag}>${this.trvtTitle}</${tag}>` : ``;
	}
}
customElements.define('trvt-article', TrvtArticle);
