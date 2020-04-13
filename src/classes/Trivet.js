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
		this.template = this.template || Trivet.appendDynamicTemplate.call(this);
		if (typeof this.template === 'function') {
			const temp = Trivet.wrapTemplateWithTag.call(this);
			render(temp, this.shadowRoot);
		}
	}

	static wrapTemplateWithTag(){

		const temp = this.template();
		const block = this.block;
		const modifier = block && this.modifier && `${block}--${this.modifier}`;

		if(this.tag) {
			const wrapper = document.createElement(this.tag);
			wrapper.classList.add(...[block, modifier].filter(c=>c));
			wrapper.textContent = this.text || null;
			wrapper.innerHTML = wrapper.innerHTML || temp.template.element.innerHTML;
			temp.template.element.innerHTML = wrapper.outerHTML;
		}
		return temp;
	}

	static appendDynamicTemplate(){
		let contentSlot = this.querySelector('[slot=default]');
		return contentSlot ? () => html`<slot name="default"></slot>` : () => html``;
	}
}

export { Trivet, html, render }

