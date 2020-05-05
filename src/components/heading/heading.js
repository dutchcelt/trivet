import { Trivet, html } from 'Trivet';
import shadowStyles from './heading.css';

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
			const slot = Trivet.compositions(['default',this.text]);
			const bem = this.bem();
			switch (tag.toLowerCase()) {
				case 'h6':
					temp = 	html`<h6 class="${bem}">${slot}</h6>`;
					break;
				case 'h5':
					temp = 	html`<h5 class="${bem}">${slot}</h5>`;
					break;
				case 'h4':
					temp = 	html`<h4 class="${bem}">${slot}</h4>`;
					break;
				case 'h3':
					temp = 	html`<h3 class="${bem}">${slot}</h3>`;
					break;
				case 'h2':
					temp = 	html`<h2 class="${bem}">${slot}</h2>`;
					break;
				default:
					temp = 	html`<h1 class="${bem}">${slot}</h1>`;
				}
			return temp;
		}
	}
);

