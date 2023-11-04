import { TrivetElement as e } from '@trvt/core';
import t from './styles-b493b4c8.css' assert { type: 'css' };
class s extends e {
	#e;
	constructor() {
		super(),
			(this.shadowStyleSheets = [t]),
			(this.template = '<div class="scrollbox"><slot></slot></div>'),
			(this.pos = { top: 0, left: 0, x: 0, y: 0 }),
			(this.#e = new RegExp('mousedown|mousemove|mouseup', 'i'));
	}
	connectedCallback() {
		this.shadowFragment.addEventListener('mousedown', this);
	}
	handleEvent(e) {
		this.#e.test(e.type) && this[e.type](e);
	}
	mousedown(e) {
		(this.shadowFragment.style.cursor = 'grabbing'),
			(this.shadowFragment.style.userSelect = 'none'),
			this.shadowFragment.style.setProperty('--if-snap', 'var(--FALSE)'),
			(this.pos = {
				left: this.shadowFragment.scrollLeft,
				top: this.shadowFragment.scrollTop,
				x: e.clientX,
				y: e.clientY,
			}),
			document.addEventListener('mousemove', this),
			document.addEventListener('mouseup', this);
	}
	mousemove(e) {
		const t = e.clientX - this.pos.x,
			s = e.clientY - this.pos.y;
		(this.shadowFragment.scrollTop = this.pos.top - s),
			(this.shadowFragment.scrollLeft = this.pos.left - t);
	}
	mouseup(e) {
		document.removeEventListener('mousemove', this),
			document.removeEventListener('mouseup', this),
			(this.shadowFragment.style.cursor = 'grab'),
			this.shadowFragment.style.removeProperty('user-select'),
			this.shadowFragment.style.setProperty('--if-snap', 'var(--TRUE)');
	}
}
customElements.define('trvt-drag-scroller', s);
export { s as TrvtDragScroller };
