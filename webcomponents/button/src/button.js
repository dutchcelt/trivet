import { mix, TrivetElement, FormMixin, ReactiveMixin } from '@trvt/core';
import buttonCSS from './button.css' assert { type: 'css' };
import { EventMixin } from './eventMixin.js';

/**
 * @class TrvtButton
 * @extends {mix(TrivetElement).with(FormMixin, EventMixin, ReactiveMixin)}
 * @property {Array.<string>} observedAttributes - a list of attributes for the TrvtButton
 */
export class TrvtButton extends mix(TrivetElement).with(
	FormMixin,
	EventMixin,
	ReactiveMixin
) {
	static observedAttributes = [
		'data-trvt-context',
		'data-trvt-disabled',
		'data-trvt-readonly',
	];

	constructor() {
		super();
		this.#initMemberVariable('trvtType', 'button');
		this.#initMemberVariable('trvtValue', '');
		this.#initMemberVariable('trvtContext', 'default');
		this.#initMemberVariable('trvtDisabled', false);
		this.#initMemberVariable('trvtReadonly', false);
		this.shadowStyleSheets = [buttonCSS];
		this.template = this.#buttonTemplateString();
	}

	/**
	 * @private
	 * @param {string} propertyName - The name of the property
	 * @param {string | boolean} defaultValue - The default value of the property
	 */
	#initMemberVariable(propertyName, defaultValue) {
		this[propertyName] = this.dataset?.[propertyName] || defaultValue;
		delete this.dataset[propertyName];
	}

	/**
	 * @private
	 * Generates a template string for the button.
	 * @returns {string} - An HTML string for the button
	 */
	#buttonTemplateString() {
		return `
            <button 
                type="${this.trvtType}"
                ${this.hidden ? ' hidden' : ''}	
                ${this.value ? ` value="${this.value}"` : ''}
                ${this.trvtDisabled ? ' disabled' : ''}
                ${this.trvtReadonly ? ' readonly' : ''}
                ${this.id ? ` id="${this.id}"` : ''}
                ${this.name ? ` name="${this.name}"` : ''} 
            >
                <slot></slot>
            </button>
        `;
	}
}
customElements.define('trvt-button', TrvtButton);
