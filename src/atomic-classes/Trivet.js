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
			render(this.template(), this.shadowRoot);
		}
	}

	static renderString(data, stringFunction) {
		return data.reduce((a,c) => a + stringFunction(c), '');
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

	static createSlot(slotname){
		const slot = document.createElement('slot');
		slot.name = slotname;
		return slot;

	}
}

export { Trivet, html, render }

