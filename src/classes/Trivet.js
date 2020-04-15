import { html, render } from 'lit-html';

/**
 * Atomic design class
 */
class Trivet extends HTMLElement {
	constructor() {
		super();
	}
	connectedCallback(){
		this.dataset.cloak && requestAnimationFrame(() => {
			delete this.dataset.cloak;
		});
		this.classnames || this.bem();
		this.template = this.template || this.dynamicTemplate();
		typeof this.template === 'function' && this.wrapTemplateWithTag();
	}

	wrapTemplateWithTag(){

		const instance = this.template();
		const target = this.shadowRoot;
		if(this.tag) {
			const wrapper = document.createElement(this.tag);
			wrapper.classList.add(...this.classnames);
			wrapper.textContent = this.text || null;

			wrapper.innerHTML = wrapper.innerHTML || instance.template.element.innerHTML;
			instance.template.element.innerHTML = wrapper.outerHTML;
		}
		render(instance, target);
	}

	dynamicTemplate(){
		return this.querySelector('[slot=default]') ? () => html`<slot name="default"></slot>` : () => html``;
	}

	bem(){

		const getBem = n => this[n] || this.getAttribute(n) || '';
		const bemObj = {block:'',element:'__',modifier:'--'};
		const bemArr = Object.keys(bemObj).map(n => getBem(n) && (bemObj[n] + getBem(n)));
		const elmName = bemArr[0] + bemArr[1] || null;
		this.classnames = [elmName];
		bemArr[2] && this.classnames.push(elmName + bemArr[2]);
		this.classnames.filter(cls => cls);
	}

}

export { Trivet, html, render }

