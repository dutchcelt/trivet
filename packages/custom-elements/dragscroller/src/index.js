// @ts-nocheck
import { TrivetElement } from '@trvt/core';
// @ts-expect-error
import dragscrollerCSS from './dragscroller.css' with { type: 'css' };

export class TrvtDragScroller extends TrivetElement {
	#validEventTypes;
	constructor() {
		super();
		this.shadowStyleSheets = [dragscrollerCSS];
		this.template = `<div class="scrollbox"><slot></slot></div>`;

		this.pos = { top: 0, left: 0, x: 0, y: 0 };
		this.#validEventTypes = new RegExp('mousedown|mousemove|mouseup', 'i');
	}
	connectedCallback() {
		this.shadowFragment.addEventListener('mousedown', this);
	}
	/**
	 * Generic Event Handler
	 * @param {Event} event
	 */
	handleEvent(event) {
		const type = event.type;
		if (this.#validEventTypes.test(event.type)) {
			// @ts-expect-error
			this[type](event);
		}
	}
	/**
	 * mousedown
	 * @param {MouseEvent} event
	 */
	mousedown(event) {
		this.shadowFragment.style.cursor = 'grabbing';
		this.shadowFragment.style.userSelect = 'none';
		this.shadowFragment.style.setProperty('--if-snap', 'var(--FALSE)');
		this.pos = {
			// The current scroll
			left: this.shadowFragment.scrollLeft,
			top: this.shadowFragment.scrollTop,
			// Get the current mouse position
			x: event.clientX,
			y: event.clientY,
		};
		document.addEventListener('mousemove', this);
		document.addEventListener('mouseup', this);
	}
	/**
	 * mousemove
	 * @param {MouseEvent} event
	 */
	mousemove(event) {
		// How far the mouse has been moved
		const dx = event.clientX - this.pos.x;
		const dy = event.clientY - this.pos.y;
		// Scroll the element
		this.shadowFragment.scrollTop = this.pos.top - dy;
		this.shadowFragment.scrollLeft = this.pos.left - dx;
	}
	/**
	 * mouseup
	 */
	mouseup() {
		document.removeEventListener('mousemove', this);
		document.removeEventListener('mouseup', this);
		this.shadowFragment.style.cursor = 'grab';
		this.shadowFragment.style.removeProperty('user-select');
		this.shadowFragment.style.setProperty('--if-snap', 'var(--TRUE)');
	}
}
customElements.define('trvt-drag-scroller', TrvtDragScroller);
