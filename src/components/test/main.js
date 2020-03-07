import styleTest from 'styleTest';
const defaultString = "These are not the droids you are looking for";

customElements.define('trvt-test-elem',
	class extends HTMLElement {
		constructor() {
			super();
			this.contentString = this.getAttribute('tekst');
			this.tag = this.getAttribute('tag') || 'p';
			this.attachShadow({mode: 'open'});
			this.shadowRoot.adoptedStyleSheets = [styleTest];
		}
		connectedCallback(){
			appendDynamicTemplate(this);
		}
	}
);

function appendDynamicTemplate(elem){
	const attrs = [...elem.attributes].filter(a => !(/tekst|tag/ig).test(a.name));
	const trvtElem = document.createElement(elem.tag);
	if (elem.contentString) {
		trvtElem.textContent = elem.contentString;
	} else {
		const slot = document.createElement('slot');
		slot.name = 'default';
		trvtElem.appendChild(slot);
	}
	attrs.forEach(a => {
		trvtElem.setAttribute(a.name, a.value); // copy attribute to new element
		elem.removeAttribute(a.name); // removed redundant attribute on web component
	});
	elem.shadowRoot.appendChild(trvtElem);
}
