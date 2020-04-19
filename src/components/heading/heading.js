import shadowStyles from './heading.css';
import { Elements, html } from 'Elements';
import { classMap } from "class-map";
let classes = { highlight: true, enabled: false, hidden: false };

const tags = {
	h1: (data) => html`<h1 class="${classMap(data.classes)}"><slot name="default">${data.text}</slot></h1>`,
	h2: (data) => html`<h2 class="${classMap(data.classes)}"><slot name="default">${data.text}</slot></h2>`,
	h3: (data) => html`<h3 class="${classMap(data.classes)}"><slot name="default">${data.text}</slot></h3>`,
	h4: (data) => html`<h4 class="${classMap(data.classes)}"><slot name="default">${data.text}</slot></h4>`,
	h5: (data) => html`<h5 class="${classMap(data.classes)}"><slot name="default">${data.text}</slot></h5>`,
	h6: (data) => html`<h6 class="${classMap(data.classes)}"><slot name="default">${data.text}</slot></h6>`,
}

customElements.define('trvt-heading',
	class extends Elements {
		constructor() {
			super();
			this.attachShadow({ mode: 'open' });
			this.shadowRoot.adoptedStyleSheets = [shadowStyles];
			if(/span/i.test(this.tag)) this.tag = 'H1';
			this.template = tags[this.tag.toLowerCase()];
			this.block = 'heading';
		}

	}
);

