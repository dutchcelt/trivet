import styleTest from 'styleTest';
const defaultString = "These are not the droids you are looking for";

customElements.define('trvt-test-elem',
	class extends HTMLElement {
		constructor() {
			super();
			const el = this;
			const contentString = el.getAttribute('tekst') || defaultString;
			const shadowRoot = el.attachShadow({mode: 'open'});
			shadowRoot.adoptedStyleSheets = [styleTest];
			requestAnimationFrame(() => {
				const tag = el.getAttribute('tag') || 'p';
				const attrs = [...el.attributes].filter(a => !(/tekst|tag/ig).test(a.name));
				const trvtElem = document.createElement(tag);
				trvtElem.textContent = contentString;
				attrs.forEach(a => trvtElem.setAttribute(a.name, a.value));
				shadowRoot.appendChild(trvtElem);
			})

		}

	}
);

