import { Trivet, html } from 'Trivet';
import shadowStyles from './heading.css';
import { classMap } from "class-map";

customElements.define('trvt-heading',
	class extends Trivet {
		constructor() {
			super();
			this.block = 'heading';
		}
		render() {
			this.shadowRoot.adoptedStyleSheets = [shadowStyles];
			return this.template();
		}
		template() {
			let temp;
			const tag = this.tag || 'h1';
			const slot = html`<slot name="default">${this.text}</slot>`;
			const map = classMap(this.bemClassMap());
			switch (tag) {
			case 'h6':
				temp = 	html`<h6 class="${map}">${slot}</h6>`;
				break;
			case 'h5':
				temp = 	html`<h5 class="${map}">${slot}</h5>`;
				break;
			case 'h4':
				temp = 	html`<h4 class="${map}">${slot}</h4>`;
				break;
			case 'h3':
				temp = 	html`<h3 class="${map}">${slot}</h3>`;
				break;
			case 'h2':
				temp = 	html`<h2 class="${map}">${slot}</h2>`;
				break;
			default:
				temp = 	html`<h1 class="${map}">${slot}</h1>`;
			}
			return temp;
		}
	}
);

