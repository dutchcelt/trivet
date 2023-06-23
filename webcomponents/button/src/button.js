import { styles } from '@trvt/core';
import buttonCSS from './button.css' assert { type: 'css' };
import buttonLightDomCSS from './button-lightdom.css' assert { type: 'css' };

document.adoptedStyleSheets.push(buttonLightDomCSS);

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
		this.#shadowRoot.adoptedStyleSheets = [...styles, buttonCSS];
		this.tabIndex = 0;
		this.#type = this.dataset.trvtType || 'button';
		delete this.dataset.trvtType;
		this.#value = this.dataset.trvtValue || '';

		this.trvtDisabled = this.dataset.trvtDisabled || false;
		this.#shadowRoot.appendChild(this.#render());
		this.button = this.#shadowRoot.querySelector('button');
		this.button.addEventListener('click', () => {
			this.#internals.form && this.#internals.setFormValue(this.#value);
			if (this.#type === 'submit') this.#internals.form.submit();
		});
	}
	attributeChangedCallback(name, oldValue, newValue) {
		this.#value = newValue;
		this.#internals.form && this.#internals.setFormValue(newValue);
	}
	#render() {
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
}
customElements.define('trvt-button', TrvtButton);
