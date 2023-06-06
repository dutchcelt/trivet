import { styles, createFragment } from '@trvt/core';
import articleCSS from './article.css' assert { type: 'css' };
const articleTypes = Object.freeze({
	page: 'H1',
	default: 'H2',
	summary: 'H3',
});

export class TrvtArticle extends HTMLElement {
	#tag;
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.adoptedStyleSheets = [...styles, articleCSS];

		this.type = this.getAttribute('type');
		this.#tag = articleTypes[this.type] || articleTypes.default;
		this.shadowRoot.appendChild(this.render());
	}

	getHeadingTagName() {
		const headingTagName = this.querySelector("[slot='heading']")?.tagName;
		const isValidHeadingTag = Object.values(articleTypes).includes(
			headingTagName || ''
		);
		return (
			(isValidHeadingTag && '') || articleTypes[this.type || 'default']
		);
	}

	headingTemplate() {
		const slot = `<slot name="heading"></slot>`;
		let headingElement;
		if (this.type) {
			headingElement = document.createElement(this.#tag);
			headingElement.innerHTML = slot;
		}
		return this.type ? headingElement.outerHTML : slot;
	}

	render() {
		return createFragment(`
			<article>
				${this.headingTemplate()}
				<slot name="intro"></slot>
        <slot name="content"></slot>
        <slot name="footer"></slot>
			</article>
		`);
	}
}
customElements.define('trvt-article', TrvtArticle);
