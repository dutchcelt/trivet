import { styles } from '@trvt/core';
import dutchceltLogoCSS from './dutchceltlogo.css' assert { type: 'css' };

export class TrvtDutchceltLogo extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.href = this.getAttribute('data-trvt-href') || '/';
	}
	connectedCallback() {
		this.shadowRoot.adoptedStyleSheets = [...styles, dutchceltLogoCSS];
		this.shadowRoot.appendChild(this.render());
	}
	render() {
		this.style = `--header-image-src:url("${this.dataset.imageSrc}");`;
		return document.createRange().createContextualFragment(`
			<a href="${encodeURI(this.href)}">
				<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="26" height="28" viewBox="0 0 26 28">
					<title>star</title>
					<path d="M26 10.109c0 0.281-0.203 0.547-0.406 0.75l-5.672 5.531 1.344 7.812c0.016 0.109 0.016 0.203 0.016 0.313 0 0.406-0.187 0.781-0.641 0.781-0.219 0-0.438-0.078-0.625-0.187l-7.016-3.687-7.016 3.687c-0.203 0.109-0.406 0.187-0.625 0.187-0.453 0-0.656-0.375-0.656-0.781 0-0.109 0.016-0.203 0.031-0.313l1.344-7.812-5.688-5.531c-0.187-0.203-0.391-0.469-0.391-0.75 0-0.469 0.484-0.656 0.875-0.719l7.844-1.141 3.516-7.109c0.141-0.297 0.406-0.641 0.766-0.641s0.625 0.344 0.766 0.641l3.516 7.109 7.844 1.141c0.375 0.063 0.875 0.25 0.875 0.719z"></path>
				</svg>
				Dutchc<span class="reverse">e</span>lt
			</a>
		`);
	}
}
customElements.define('trvt-dutchcelt-logo', TrvtDutchceltLogo);
