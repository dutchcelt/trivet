import { styles } from '@trvt/core';
import buttonCSS from './button.css' assert { type: 'css' };

export class TrvtButton extends HTMLElement {
	static formAssociated = true;

	constructor() {
		super();
		this.internals = this.attachInternals();

		this.attachShadow({ mode: 'open' });
		this.shadowRoot.adoptedStyleSheets = [...styles, buttonCSS];
		this.id = '';
		this.name = '';
		this.hidden = false;
		this.disabled = false;
		this.name = '';
		this.trvtText = this.dataset.trvtText || '';
		this.trvtText = this.dataset.trvtText || '';
		this.trvtValue = this.dataset.trvtValue || '';
		this.trvtType = this.dataset.trvtType || 'button';

		this.shadowRoot.appendChild(this.render());
	}
	render() {
		return document.createRange().createContextualFragment(`
			<button 
				type="${this.trvtType}"
				value="${this.trvtValue}"
				disabled="${this.trvtType}"
				hidden="${this.hidden}"
				disabled="${this.disabled}"
				id="${this.id}"
				name="${this.name}"
				>
				${this.trvtText}
			</button>
		`);
	}
}
customElements.define('trvt-button', TrvtButton);
