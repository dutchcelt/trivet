import { TrvtContainer } from '@trvt/container';
// @ts-expect-error
import cardCSS from './card.css' with { type: 'css' };

/**
 * @constant
 * @type {string}
 * @description Holds the custom name for the custom HTML element
 **/
const ELEMENT_NAME = 'trvt-card';

/**
 * The TrvtCard class extends the TrvtContainer class and represents a card component.
 * @extends TrvtContainer
 */
export class TrvtCard extends TrvtContainer {
	/**
	 * @constructor
	 * @description Instantiates TrvtCard class and sets the shadow style sheet and the template.
	 */
	constructor() {
		super();
		/** @type {CSSStyleSheet[]} */
		this.shadowStyleSheets = [cardCSS];
	}
}

customElements.define(ELEMENT_NAME, TrvtCard);
