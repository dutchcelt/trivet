import { styles, dataBus } from '@trvt/core';
import articleCSS from './article.css' assert { type: 'css' };

export class TrvtArticle extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.adoptedStyleSheets = [...styles, articleCSS];
		this.trvtTitle = this.dataset.trvtTitle;
		this.layoutDetail = dataBus?.trvtLayout?.detail;
		if (this.layoutDetail === undefined)
			dataBus.register('trvtLayout', this.__layoutEvent.bind(this));
	}
	connectedCallback() {
		this.layoutDetail && this.__layoutEvent({ detail: this.layoutDetail });
	}
	render() {
		return document.createRange().createContextualFragment(`
			<article>
        ${this.__headingTemplate()}
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
	__headingTemplate() {
		const tag = this.layoutType === 'article' ? 'h1' : 'h2';
		return this.trvtTitle ? `<${tag}>${this.trvtTitle}</${tag}>` : ``;
	}

	/**
	 * Renders out the article based on the layout type
	 * Gets the type from an event or state.
	 * @param {Object} event
	 * @private
	 */
	__layoutEvent(event = {}) {
		this.layoutType = event?.detail?.type;
		this.layoutType
			? this.shadowRoot.appendChild(this.render())
			: console.error(`Can't set layout type of: '${this.layoutType}'`);
		event.type === 'trvtLayout' &&
			dataBus.remove('trvtLayout', this.__layoutEvent.bind(this));
	}
}
customElements.define('trvt-article', TrvtArticle);
