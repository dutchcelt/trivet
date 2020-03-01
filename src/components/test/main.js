import styleTest from 'styleTest';

customElements.define('trvt-test-elem',
	class extends HTMLElement {
		constructor() {
			super();
			const elem = this;
			const shadowRoot = elem.attachShadow({mode: 'open'});
			requestAnimationFrame(() => {
				const trvtElem = document.createElement(elem.getAttribute('tag') || 'p');
				trvtElem.textContent = elem.getAttribute('tekst') || "These are not the droids you are looking for";
				trvtElem.className = elem.className||'';
				shadowRoot.adoptedStyleSheets = [styleTest];
				shadowRoot.appendChild(trvtElem);
			})

		}

	}
);
