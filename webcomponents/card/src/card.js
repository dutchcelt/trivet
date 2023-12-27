import {TrivetElement} from '@trvt/core';
import cardCSS from './card.css' assert {type: 'css'};

/**
 * @constant
 * @type {string}
 * @description Holds the custom name for the custom HTML element
 **/
const ELEMENT_NAME = 'trvt-card';

/**
 * @class
 * @classdesc Represents a TrvtCard which extends TrivetElement.
 * @extends TrivetElement
 */
export class TrvtCard extends TrivetElement {
	/**
	 * @constructor
	 * @description Instantiates TrvtCard class and sets the shadow style sheet and the template.
	 */
	constructor() {
		super();
		/** @type {CSSStyleSheet} */
		this.shadowStyleSheets = [cardCSS];
		this.template = this.contentTemplate();
	}

	/**
	 * Generate the content in HTML format
	 * @method
	 * @returns {string} The HTML content template.
	 */
	contentTemplate() {
		return `
			<article>
				<slot name="heading"></slot>
				<slot name="intro"></slot>
				<slot name="content"></slot>
				<slot name="footer"></slot>
				<slot></slot>
			</article>
		`;
	}
}

customElements.define(ELEMENT_NAME, TrvtCard);
customElements.define(ELEMENT_NAME, TrvtCard);
