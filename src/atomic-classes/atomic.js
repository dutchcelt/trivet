/**
 * Atomic design class
 */
export class Atomic extends HTMLElement {
	constructor() {
		super();
	}

	static appendDynamicTemplate(elem){
		const slotContent = elem.querySelector('[slot]');
		const trvtElem = document.createElement(elem.tag);
		slotContent && trvtElem.appendChild(this.createSlot(slotContent));
		elem.contentString && (trvtElem.textContent = elem.contentString);
		elem.attrs.forEach(a => {
			trvtElem.setAttribute(a.name, a.value); // copy attribute to new element
			elem.removeAttribute(a.name); // removed redundant attribute on web component
		});
		elem.shadowRoot.appendChild(trvtElem);
	}
	static createSlot(slotContent, slotname = 'default'){
		if (slotContent.slot === slotname){
			const slot = document.createElement('slot');
			slot.name = slotname;
			return slot;
		}
	}
}


