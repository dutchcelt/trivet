import styleTest from 'styleTest';

customElements.define('trvt-test-elem',
	class extends HTMLElement {
		constructor() {
			super();
			this.contentString = this.getAttribute('text');
			this.tag = this.getAttribute('tag') || 'p';
			this.attrs = [...this.attributes].filter(a => !(/text|tag/ig).test(a.name));
			this.attachShadow({mode: 'open'});
			this.shadowRoot.adoptedStyleSheets = [styleTest];
		}
		connectedCallback(){
			appendDynamicTemplate(this);
		}
	}
);

function appendDynamicTemplate(elem){
	const slotContent = elem.querySelector('[slot]');
	const trvtElem = document.createElement(elem.tag);
	slotContent && trvtElem.appendChild(createSlot(slotContent));
	elem.contentString && (trvtElem.textContent = elem.contentString);
	elem.attrs.forEach(a => {
		trvtElem.setAttribute(a.name, a.value); // copy attribute to new element
		elem.removeAttribute(a.name); // removed redundant attribute on web component
	});
	elem.shadowRoot.appendChild(trvtElem);
}

function createSlot(slotContent, slotname = 'default'){
	if (slotContent.slot === slotname){
		const slot = document.createElement('slot');
		slot.name = slotname;
		return slot;
	}
}
