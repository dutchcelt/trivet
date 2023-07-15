import { styles, mix, FormMixin } from '@trvt/core';
import buttonCSS from './button.css' assert { type: 'css' };
import { EventMixin } from './eventMixin.js';

export class TrvtButton extends mix(HTMLElement).with(FormMixin, EventMixin) {
	static observedAttributes = [
		'data-trvt-context',
		'data-trvt-disabled',
		'data-trvt-readonly',
	];
	constructor() {
		super();
		this.contextCSS = new CSSStyleSheet();
		this.shadow.adoptedStyleSheets = [
			...styles,
			buttonCSS,
			this.contextCSS,
		];
		this.trvtType = this.dataset.trvtType || 'button';
		delete this.dataset.trvtType;
		this.value = this.dataset.trvtValue || '';
		delete this.dataset.trvtValue;
		this.trvtContext = this.dataset.trvtContext || 'default';
		this.trvtDisabled = this.dataset.trvtDisabled || false;
		this.trvtReadonly = this.dataset.trvtReadonly || false;
		this.shadow.appendChild(this.#render());
	}

	/**
	 * @private
	 */
	#render() {
		return document.createRange().createContextualFragment(`
			<button 
				type="${this.trvtType}"
				${!!this.hidden ? ' hidden' : ''}	
				${!!this.value ? ` value="${this.value}"` : ''}
				${!!this.trvtDisabled ? ' disabled' : ''}
				${!!this.trvtReadonly ? ' readonly' : ''}
				${!!this.id ? ` id="${this.id}"` : ''}
				${!!this.name ? ` name="${this.name}"` : ''} 
			>
				<slot></slot>
			</button>
		`);
	}
}
customElements.define('trvt-button', TrvtButton);
