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
		})
	}
	connectedCallback(){
		this.classnames = Trivet.createBEMClasses(this.getBemAttributes());
		this.insertTemplate();
		this.removeCloak();
	}

	removeCloak(){
		this.dataset.cloak && requestAnimationFrame(() => {
			delete this.dataset.cloak;
		});
	}
	wrapTemplateWithTag(){
		const wrapper = document.createElement(this.tag);
		wrapper.classList.add(...this.classnames);
		return this.shadowRoot.appendChild(wrapper);
	}
	dynamicDefaultTemplate(){
		return this.querySelector('[slot=default]')
			? () => html`<slot name="default"></slot>`
			: () => html`${this.text}`;
	}
	insertTemplate(){
		this.template = this.template || this.dynamicDefaultTemplate();
		if (typeof this.template === 'function') {
			const target = this.tag ? this.wrapTemplateWithTag() : this.shadowRoot;
			render(this.template(), target);
		}
	}
	getBemAttributes() {
		const o = Object.assign({},this.bemObject);
		Object.keys(o).forEach(n => o[n] = (this.getAttribute(n) || this[n] || '').trim());
		return o;
	}
	static createBEMClasses(attrs){
		const BE = [['', attrs.block],['__', attrs.element]]
			.map(([divider, bemName]) => bemName && divider + bemName);
		const BEM = [BE.join('')];
		const modifiers = attrs.modifier.split(',');
		modifiers.forEach(M => M && BEM.push(BEM[0] + '--' + M.trim()));
		return BEM.filter(cls => cls);
	}

}

export { Trivet, html, render }

