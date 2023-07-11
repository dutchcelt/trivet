import { styles } from '@trvt/core';
import details from './details.css' assert { type: 'css' };

export class TrvtToggleDetails extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.render();
		this.shadowRoot.adoptedStyleSheets = [...styles, details];
		this.detailsElement = this.shadowRoot.querySelector('details');
		this.contentElement = this.shadowRoot.querySelector('.content');
		this.loaded = false;
		this.toggleEvent = new Event('toggle', {
			bubbles: true,
			cancelable: true,
			composed: false, // event is added to the host so no need to compose the event
		});
	}
	connectedCallback() {
		console.log('connectedCallback');
		this.detailsElement.addEventListener('toggle', this);
	}

	attributeChangedCallback(attributeName, oldValue, newValue) {
		if (oldValue === newValue) return;
		const isOpen = newValue !== null;
		if (this.loaded === true) {
			this.detailsElement.toggleAttribute('open', isOpen);
			this.contentElement.toggleAttribute('inert', !isOpen);
		}
		this.loaded = true;
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
    		<details>
				<summary>${this.title}</summary>
				<div class="content"><slot></slot></div>
			</details>
		`;
	}
}
customElements.define('trvt-toggle-details', TrvtToggleDetails);
