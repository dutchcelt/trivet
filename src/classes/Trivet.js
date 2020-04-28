import { html, render } from 'lit-html';
import bemMap from 'bemMap';

/**
 * Atomic design class
 */
class Trivet extends HTMLElement {
	constructor() {
		super();
		this.bemObject = Object.freeze({
			block:'',
			element:'',
			modifier:''
		});
		this.classes = {
			'highlight': false,
			'hidden': false
		};
		this.props = {}
	}
	connectedCallback(){
		this.updateTrivet()
	}

	attributeChangedCallback(name, oldValue, newValue){
		this.updateTrivet()
	}
	static get observedAttributes() { return ['text', 'tag', 'block', 'element', 'modifier']; }

	updateTrivet() {
		this.updateProps();
		this.insertTemplate();
	}

	dynamicDefaultTemplate(){
		return this.querySelector('[slot=default]')
			? () => html`<slot name="default"></slot>`
			: () => html`${this.text}`;
	}
	updateProps(){
		this.props = {
			text: this.getAttribute('text') || '',
			tag: this.tag || this.getAttribute('tag'),
			classes: bemMap(
				this.getBemAttributes(),
				Object.assign({}, this.classes)
			)
		}
	}
	insertTemplate(){
		this.template = this.template || this.dynamicDefaultTemplate();
		if (typeof this.template === 'function') {
			render(this.template(this.props), this.shadowRoot);
		} else {
			render(this.template, this.shadowRoot);
		}
	}
	getBemAttributes() {
		const o = Object.assign({},this.bemObject);
		Object.keys(o).forEach(n => o[n] = (this.getAttribute(n) || this[n] || '').trim());
		return o;
	}
}

export { Trivet, html, render }

