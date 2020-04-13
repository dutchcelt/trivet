
/**
 * Atomic design class
 */
const getModifier = element => element.getAttribute('modifier');
import { html, render } from 'lit-html';

class Trivet extends HTMLElement {
	constructor() {
		super();
	}
	connectedCallback(){
		this.dataset.cloak && requestAnimationFrame(() => {
			delete this.dataset.cloak;
		});
		this.template = this.template || this.dynamicTemplate();
		typeof this.template === 'function' && this.wrapTemplateWithTag();
	}

	wrapTemplateWithTag(){

		const instance = this.template();
		const target = this.shadowRoot;
		const block = this.block;
		const modifier = block && this.modifier && `${block}--${this.modifier}`;

		if(this.tag) {
			const wrapper = document.createElement(this.tag);
			wrapper.classList.add(...[block, modifier].filter(c=>c));
			wrapper.textContent = this.text || null;
			wrapper.innerHTML = wrapper.innerHTML || instance.template.element.innerHTML;
			instance.template.element.innerHTML = wrapper.outerHTML;
		}
		render(instance, target);
	}

	dynamicTemplate(){
		return this.querySelector('[slot=default]') ? () => html`<slot name="default"></slot>` : () => html``;
	}
}

export { Trivet, html, render }

