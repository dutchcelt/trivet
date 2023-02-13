import { styles, createFragment } from '@trvt/core';
import dragscrollerCSS from './dragscroller.css' assert { type: 'css' };

export class TrvtDragScroller extends HTMLElement {
	#validEventTypes;
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.adoptedStyleSheets = [...styles, dragscrollerCSS];
		this.shadowRoot.appendChild(this.render());
		this.pos = { top: 0, left: 0, x: 0, y: 0 };
		this.#validEventTypes = new RegExp('mousedown|mousemove|mouseup', 'i');
	}
	render() {
		return createFragment(`<div class="scrollbox"><slot></slot></div>`);
	}
	connectedCallback() {
		this.scrollbox = this.shadowRoot.querySelector('.scrollbox');
		this.scrollbox.addEventListener('mousedown', this);
	}
	handleEvent(event) {
		if (this.#validEventTypes.test(event.type)) this[event.type](event);
	}
	mousedown(event) {
		this.scrollbox.style.cursor = 'grabbing';
		this.scrollbox.style.userSelect = 'none';
		this.scrollbox.style.setProperty('--if-snap', 'var(--FALSE)');
		this.pos = {
			// The current scroll
			left: this.scrollbox.scrollLeft,
			top: this.scrollbox.scrollTop,
			// Get the current mouse position
			x: event.clientX,
			y: event.clientY,
		};
		document.addEventListener('mousemove', this);
		document.addEventListener('mouseup', this);
	}
	mousemove(event) {
		// How far the mouse has been moved
		const dx = event.clientX - this.pos.x;
		const dy = event.clientY - this.pos.y;
		// Scroll the element
		this.scrollbox.scrollTop = this.pos.top - dy;
		this.scrollbox.scrollLeft = this.pos.left - dx;
	}
	mouseup(event) {
		this.scrollbox.style.cursor = 'grab';
		this.scrollbox.style.removeProperty('user-select');
		this.scrollbox.style.setProperty('--if-snap', 'var(--TRUE)');
		document.removeEventListener('mousemove', this);
		document.removeEventListener('mouseup', this);
	}
}
customElements.define('trvt-drag-scroller', TrvtDragScroller);
