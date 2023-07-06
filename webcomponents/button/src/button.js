import { styles } from '@trvt/core';
import buttonCSS from './button.css' assert { type: 'css' };

const isKeyboardClickEvent = (event) =>
	event.key === ' ' || event.key === 'Enter';
const isSpaceKeyboardClickEvent = (event) => event.key === ' ';

export class TrvtButton extends HTMLElement {
	static formAssociated = true;
	static observedAttributes = ['data-trvt-value'];
	#internals;
	#shadowRoot;
	#type;
	#value;
	constructor() {
		super();
		this.#internals = this.attachInternals();
		this.#shadowRoot = this.attachShadow({ mode: 'closed' });
		this.contextCSS = new CSSStyleSheet();
		this.#shadowRoot.adoptedStyleSheets = [
			...styles,
			buttonCSS,
			this.contextCSS,
		];
		this.#type = this.dataset.trvtType || 'button';
		delete this.dataset.trvtType;
		this.#value = this.dataset.trvtValue || '';
		this.context = this.dataset.trvtContext;
		this.trvtDisabled = this.dataset.trvtDisabled || false;
		this.#shadowRoot.appendChild(this.#render());

		this.addEventListener('click', () => this.#clickHandler());
	}
	/**
	 * attributeChangedCallback
	 * @param {Array} args
	 */
	attributeChangedCallback(...args) {
		const [, oldValue, newValue] = args;
		if (oldValue === newValue) return;
		this.#value = newValue;
		this.#internals.form && this.#internals.setFormValue(newValue);
	}

	#setContextStyle() {
		this.contextCSS.replaceSync(`
			@layer components.modifier {
				button {
					--_context: var(--_context-${this.context});
				}
			}
		`);
	}
	/**
	 * @private
	 */
	#render() {
		this.context && this.#setContextStyle();
		return document.createRange().createContextualFragment(`
			<button 
				type="${this.#type}"
				${!!this.hidden && ` hidden="true"`}
				${!!this.#value && ` value="${this.#value}"`}
				${!!this.trvtDisabled && ` disabled="true"`}
				${!!this.id && ` id="${this.id}"`}
				${!!this.name && ` name="${this.name}"`} 
			>
				<slot></slot>
			</button>
		`);
	}

	/**
	 * @private
	 */
	#clickHandler() {
		this.#internals.form && this.#internals.setFormValue(this.#value);
		if (this.#type === 'submit') this.#internals.form.submit();
	}
}
customElements.define('trvt-button', TrvtButton);
