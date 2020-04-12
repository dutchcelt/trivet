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
		if (this.template && typeof this.template === 'function') {
			const temp = Trivet.wrapTemplateWithTag(this.tag, this.template);
			render(temp, this.shadowRoot);
		}
	}

	static wrapTemplateWithTag(tag, template){
		const temp = template();
		if(tag) {
			const wrapper = document.createElement(tag);
			wrapper.innerHTML = temp.template.element.innerHTML;
			temp.template.element.innerHTML = wrapper.outerHTML;
		}
		return temp;
	}

	static appendDynamicTemplate(elem){
		const contentSlots = elem.querySelectorAll('[slot]');
		const trvtElem = document.createElement(elem.tag);
		contentSlots.forEach( el => trvtElem.appendChild(this.createSlot(el.slot)));
		elem.contentString && (trvtElem.textContent = elem.contentString);
		elem.attrs.forEach(a => {
			trvtElem.setAttribute(a.name, a.value); // copy attribute to new element
			elem.removeAttribute(a.name); // removed redundant attribute on web component
		});
		elem.shadowRoot.appendChild(trvtElem);
	}

	static renderBlock(tag){
		return html`<${tag}>${template()}</${tag}>`;
	}

	static createSlot(slotname){
		const slot = document.createElement('slot');
		slot.name = slotname;
		return slot;

	}
}

export { Trivet, html, render }

