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
		this.template = this.template || this.dynamicDefaultTemplate();
		if (typeof this.template === 'function') {
			const target = this.tag ? this.wrapTemplateWithTag() : this.shadowRoot;
			render(this.template(), target);
		}
	}

	wrapTemplateWithTag(){
		const wrapper = document.createElement(this.tag);
		wrapper.classList.add(...this.classnames);
		return this.shadowRoot.appendChild(wrapper);
	}

	dynamicDefaultTemplate(){
		return this.querySelector('[slot=default]') ? () => html`<slot name="default"></slot>` : () => html`${this.text}`;
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

