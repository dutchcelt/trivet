// @ts-nocheck
import { mix, TrivetElement, FormMixin, ReactiveMixin } from '@trvt/core';
// @ts-expect-error
import buttonCSS from './button.css' with { type: 'css' };
import { EventMixin } from './eventMixin.js';

/**
 * Represents a custom button element with additional functionality.
 */
export class TrvtButton extends mix(TrivetElement).with(
	FormMixin,
	EventMixin,
	ReactiveMixin,
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
	 * @param {string} propertyName - The name of the property
	 * @param {string | boolean} defaultValue - The default value of the property
	 */
	#initMemberVariable(propertyName, defaultValue) {
		// @ts-expect-error
		this[propertyName] = this.dataset.dataset?.[propertyName] || defaultValue;
		// @ts-expect-error
		delete this.dataset[propertyName];
	}

	/**
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

// @ts-ignore
customElements.define('trvt-button', TrvtButton);
