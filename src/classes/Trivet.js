import { html, render } from 'lit-html';

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
		this.updateProps();
		this.insertTemplate();
	}

	attributeChangedCallback(name, oldValue, newValue){
		this.updateProps();
		this.insertTemplate();
	}
	static get observedAttributes() { return ['text', 'tag', 'block', 'element', 'modifier']; }

	dynamicDefaultTemplate(){
		return this.querySelector('[slot=default]')
			? () => html`<slot name="default"></slot>`
			: () => html`${this.text}`;
	}
	updateProps(){
		this.props = {
			text: this.getAttribute('text') || '',
			tag: this.tag || this.getAttribute('tag'),
			classes: Trivet.bemClassMap(
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
	static bemClassMap(attrs,classes){
		const BE = [['', attrs.block],['__', attrs.element]]
			.map(([divider, bemName]) => bemName && divider + bemName);
		const BEM = [BE.join('')];
		const modifiers = attrs.modifier ? attrs.modifier.split(',') : [''];
		modifiers.forEach(M => M && BEM.push(BEM[0] + '--' + M.trim()));
		BEM.filter(cls => cls).forEach(cls => classes[cls] = !!cls)
		return classes;
	}
}

export { Trivet, html, render }

