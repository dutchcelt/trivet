import { styles, createFragment } from '@trvt/core';
import details from './details.css' assert { type: 'css' };

export class TrvtToggleDetails extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.render();
		this.shadowRoot.adoptedStyleSheets = [...styles, details];
		this.detailsElement = this.shadowRoot.querySelector('details');
		this.detailsElement.addEventListener('toggle', this);
		this.toggleEvent = new Event('toggle', {
			bubbles: true,
			cancelable: true,
			composed: false, // event is added to the host so no need to compose the event
		});
	}
	attributeChangedCallback(attributeName, oldValue, newValue) {
		if (oldValue === newValue) return;
		const isOpen = newValue !== null;
		this.detailsElement.toggleAttribute('open', isOpen);
	}
	static get observedAttributes() {
		return ['open'];
	}
	handleEvent(event) {
		if (event.type === 'toggle') this.toggleHostWith(event.target);
	}

	toggleHostWith(target) {
		this.toggleAttribute('open', target.open);
		if (target.open) {
			this.dispatchEvent(this.toggleEvent);
			this.scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
				inline: 'nearest',
			});
		}
	}
	render() {
		this.shadowRoot.innerHTML = `
    	<details ${this.open ? 'open' : ''}>
				<summary>${this.title}</summary>
				<div class="content"><slot></slot></div>
			</details>
		`;
	}
}
customElements.define('trvt-toggle-details', TrvtToggleDetails);