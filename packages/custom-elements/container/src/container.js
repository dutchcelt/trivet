import { TrivetElement } from '@trvt/core';
// @ts-expect-error
import containerCSS from './container.css' with { type: 'css' };

// const containerTypes = new set(
// 	['document', 'section', 'component', 'element']
// };

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
		this.shadowCSSvars = [
			`--trvt-container-type: ${this.type || ''}`,
			`this.elevation: ${this.elevation || 0}`,
		];
		let slots = this.shadow.querySelectorAll('slot');
		for (let slot of slots) {
			let nodes = slot.assignedNodes();
			if (nodes.length <= 0) {
				slot.parentElement.style.setProperty('display', 'none');
			}
		}
	}

	/**
	 * Generate the content in HTML format
	 * @method
	 * @returns {string} The HTML content template.
	 */
	contentTemplate() {
		return `
		<section data-component="container">
			<header class="start">
				<slot name="start"></slot>
			</header>
			<div class="default">
				<slot></slot>
			</div>	
			<aside class="aside">
				<slot name="aside"></slot>
			</aside>
			<div class="extra">
				<slot name="extra"></slot>
			</div>
			<footer class="end">
				<slot name="end"></slot>
			</footer>
		</section>`;
	}
}
