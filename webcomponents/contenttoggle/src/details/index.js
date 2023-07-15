import { styles } from '@trvt/core';
import details from './details.css' assert { type: 'css' };
import summary from './summary.css' assert { type: 'css' };

export class TrvtToggleDetails extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.render();
		this.isReady = false;
		this.shadowRoot.adoptedStyleSheets = [...styles, details, summary];
		this.detailsElement = this.shadowRoot.querySelector('details');
		this.contentElement = this.shadowRoot.querySelector('.content');
	}
	connectedCallback() {
		this.detailsElement.addEventListener('toggle', this);
		this.toggleEvent = new Event('toggle', {
			bubbles: true,
			cancelable: true,
			composed: false, // event is added to the host so no need to compose the event
		});
		setTimeout(() => {
			this.isReady = true;
		}, 1500);
	}
	attributeChangedCallback(attributeName, oldValue, newValue) {
		if (oldValue === newValue) return;
		const isOpen = newValue !== null;
		this.detailsElement.toggleAttribute('open', isOpen);
		this.contentElement.toggleAttribute('inert', !isOpen);
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
			this.isReady &&
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
