import { styles, dataBus } from '@trvt/core';
import buttonCSS from './button.css' assert { type: 'css' };

export class TrvtButton extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({mode: 'open'});
		this.shadowRoot.adoptedStyleSheets = [...styles, buttonCSS];
		this.trvtText = this.dataset.trvtText || '';
		this.trvtValue = this.dataset.trvtValue || '';
		this.trvtType = this.dataset.trvtType|| 'button';

		this.shadowRoot.appendChild(this.render());
	}
	connectedCallback() {
		this.layoutDetail && this.__layoutEvent({detail: this.layoutDetail});
	}
	render() {
		return document.createRange().createContextualFragment(`
			<button 
				type="${this.trvtType}"
				value="${this.trvtValue}"
				disabled="${this.trvtType}"
				>
				${this.trvtText}
			</button>
		`);
	}



}
customElements.define('trvt-button', TrvtButton);
