import { styles, createFragment } from '@trvt/core';
import dragscrollerCSS from './dragscroller.css' assert { type: 'css' };

export class TrvtDragScroller extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.adoptedStyleSheets = [...styles, dragscrollerCSS];
		this.shadowRoot.appendChild(this.render());
		this.pos = { top: 0, left: 0, x: 0, y: 0 };
	}
	render() {
		return createFragment(`<div class="scollbox"><slot></slot></div>`);
	}
	connectedCallback() {
		this.scollbox = this.shadowRoot.querySelector('.scollbox');
		this.scollbox.addEventListener('mousedown', this);
	}
	handleEvent(event) {
		if (event.type === 'mousedown') {
			this.scollbox.style.cursor = 'grabbing';
			this.scollbox.style.userSelect = 'none';
			this.scollbox.style.setProperty(
				'--trvt-dragscroller-snap-align',
				'unset'
			);
			this.pos = {
				// The current scroll
				left: this.scollbox.scrollLeft,
				top: this.scollbox.scrollTop,
				// Get the current mouse position
				x: event.clientX,
				y: event.clientY,
			};
			document.addEventListener('mousemove', this);
			document.addEventListener('mouseup', this);
		}
		if (event.type === 'mousemove') {
			// How far the mouse has been moved
			const dx = event.clientX - this.pos.x;
			const dy = event.clientY - this.pos.y;
			// Scroll the element
			this.scollbox.scrollTop = this.pos.top - dy;
			this.scollbox.scrollLeft = this.pos.left - dx;
		}
		if (event.type === 'mouseup') {
			this.scollbox.style.cursor = 'grab';
			this.scollbox.style.removeProperty('user-select');
			this.scollbox.style.setProperty(
				'--trvt-dragscroller-snap-align',
				'center'
			);
			document.removeEventListener('mousemove', this);
			document.removeEventListener('mouseup', this);
		}
	}
}
customElements.define('trvt-drag-scroller', TrvtDragScroller);
