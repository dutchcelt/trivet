import { html, LitElement } from "lit-element";
import trivetProps from 'trivetProps';
import bemmer from 'bemmer';

class Trivet extends LitElement {
	constructor() {
		super();
	}
	bemClassMap(){
		return bemmer(this.attributes, {
			block: this.block,
			element: this.element,
			modifier: this.modifier
		});
	}
	static get properties() {
		return {
			...trivetProps
		};
	}
	static composition(){
		return html`
			<slot name="navigation"></slot>
			<slot name="header"></slot>
			<slot name="content"></slot>
			<slot name="footer"></slot>
		`;
	}
}
export { Trivet, html }
