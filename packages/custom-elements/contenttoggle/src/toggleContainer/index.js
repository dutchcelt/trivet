// @ts-nocheck
import { styles } from '@trvt/core';
import toggleContainerCSS from './toggleContainer.css' with { type: 'css' };

export class TrvtTabContainer extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.activeDetail = undefined;
	}
	disconnectedCallback() {
		this.removeEventListener('toggle', this);
		this.removeEventListener('click', this);
	}
	connectedCallback() {
		this.addEventListener('toggle', this);
		this.addEventListener('click', this);
		this.shadowRoot.innerHTML = `
      <div class="content">
		    <slot></slot>
      </div>
	`;
		this.shadowRoot.adoptedStyleSheets = [...styles, toggleContainerCSS];
		this.slotElement = this.shadowRoot.querySelector('slot');
		this.toggleComponents = [
			...this.slotElement.assignedElements({ flatten: true }),
		].filter(wc => /toggle/gi.test(wc.tagName));
		this.style = `--numOfToggles:${this.toggleComponents.length + 1}`;
	}

	handleEvent(event) {
		event.stopPropagation();
		this.activeDetail === event.target && event.preventDefault();
		if (event.type === 'toggle') this.hideTogglesExceptFor(event.target);
	}
	hideTogglesExceptFor(target) {
		if (target.hasAttribute('open')) {
			this.activeDetail?.removeAttribute('open');
			this.activeDetail = target;
		}
	}
}
customElements.define('trvt-tab-container', TrvtTabContainer);
