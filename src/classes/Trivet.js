import { html, LitElement } from "lit-element";
import trivetProps from 'trivetProps';
import bemMap from 'bemMap';
import { classMap } from "class-map";

class Trivet extends LitElement {
	constructor() {
		super();
	}
	bem(element, modifier){
		return classMap(this.bemClassMap({ element, modifier }))
	}
	bemClassMap(args){
		const opts = { ...args };
		const BEM = {
			block: this.block || opts.block || '',
			element: this.element || opts.element || '',
			modifier: opts.element ? opts.modifier : this.modifier || ''
		};
		return bemMap(BEM);
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
export { Trivet, html, classMap }
