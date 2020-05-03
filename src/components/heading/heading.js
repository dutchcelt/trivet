import { LitElement, html } from 'lit-element';
import { classMap } from "class-map";
import shadowStyles from './heading.css';
import trivetProps from 'trivetProps';
import bemmer from 'bemmer';

customElements.define('trvt-heading',
	class extends LitElement {
		static get properties() {
			return {
				...trivetProps
			};
		}
		constructor() {
			super();
			this.block = 'heading';
		}
		bemClassMap(){
			return bemmer(this.attributes, { block: this.block });
		}
		render() {
			this.shadowRoot.adoptedStyleSheets = [shadowStyles];
			return html`<h1 class="${classMap(this.bemClassMap())}"><slot name="default">${this.text}</slot></h1>`;
		}
	}
);

