/**
 * Atomic design class
 */
const getModifier = element => element.getAttribute('modifier');

export class Trivet extends HTMLElement {
	constructor() {
		super();
	}
	connectedCallback(){
		const modifier = getModifier(this);
		const selector = modifier && this.shadowRoot.querySelector(`.${this.tagName.toLowerCase()}`);
		selector && selector.classList.add(`${this.tagName.toLowerCase()}--${modifier}`);
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


