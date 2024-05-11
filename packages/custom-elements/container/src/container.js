import { TrivetElement } from '@trvt/core';
// @ts-expect-error
import containerCSS from './container.css' with { type: 'css' };

/**
 * @constant
 * @type {string}
 * @description Holds the custom name for the custom HTML element
 **/
const ELEMENT_NAME = 'trvt-container';

/**
 * Represents a TrvtContainer which extends TrivetElement.
 * @class
 */
export class TrvtContainer extends TrivetElement {
	/**
	 * @constructor
	 * @description Instantiates TrvtCard class and sets the shadow style sheet and the template.
	 */
	constructor() {
		super();
		/** @type {CSSStyleSheet[]} */
		this.shadowStyleSheets = [containerCSS];
		this.template = this.contentTemplate();
	}

	/**
	 * Generate the content in HTML format
	 * @method
	 * @returns {string} The HTML content template.
	 */
	contentTemplate() {
		return `
		<section>
			<div class="start">
				<slot name="start"></slot>
			</div>
			<div class="default">
				<slot></slot>
			</div>	
			<div class="extra">
				<slot name="extra"></slot>
			</div>
			<div class="end">
				<slot name="end"></slot>
			</div>
		</section>`;
	}
}

customElements.define(ELEMENT_NAME, TrvtContainer);
