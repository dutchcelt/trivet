import { styles } from '@trvt/core';
// @ts-expect-error
import details from './details.css' with { type: 'css' };
// @ts-expect-error
import summary from './summary.css' with { type: 'css' };

export class TrvtToggleDetails extends HTMLElement {
	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: 'open' });
		this.render();
		this.isReady = false;
		this.shadow.adoptedStyleSheets = [...styles, details, summary];
		this.detailsElement = this.shadow.querySelector('details');
		this.contentElement = this.shadow.querySelector('.content');
	}

	connectedCallback() {
		this.detailsElement?.addEventListener('toggle', this);
		this.toggleEvent = new Event('toggle', {
			bubbles: true,
			cancelable: true,
			composed: false, // event is added to the host so no need to compose the event
		});
		setTimeout(() => {
			this.isReady = true;
		}, 1500);
	}

	/**
	 * Calls when the value of an observed attribute is changed.
	 *
	 * @param {string} attributeName - The name of the attribute that has changed.
	 * @param {any} oldValue - The previous value of the attribute.
	 * @param {any} newValue - The new value of the attribute.
	 * @return {void}
	 */
	attributeChangedCallback(attributeName, oldValue, newValue) {
		if (oldValue === newValue) return;
		const isOpen = newValue !== null;
		this.detailsElement?.toggleAttribute('open', isOpen);
		this.contentElement?.toggleAttribute('inert', !isOpen);
	}

	static get observedAttributes() {
		return ['open'];
	}

	/**
	 * @param {Event & { target: EventTarget }} event
	 * @this {HTMLElement & { toggleHostWith: Function}}
	 * */
	handleEvent(event) {
		if (event.type === 'toggle') this.toggleHostWith(event.target);
	}

	/**
	 * @param {HTMLDetailsElement} target
	 * @this {TrvtToggleDetails & { toggleEvent: Event, isReady: boolean} }
	 */
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
		this.shadow.innerHTML = `
    		<details>
				<summary>${this.title}</summary>
				<div class="content"><slot></slot></div>
			</details>
		`;
	}
}

customElements.define('trvt-toggle-details', TrvtToggleDetails);
