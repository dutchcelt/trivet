import { LitElement, html } from 'lit-element';
import { classMap } from "class-map";
import shadowStyles from './heading.css';
import bemMap from 'bemMap';

customElements.define('trvt-heading',
	class extends LitElement {
		static get properties() {
			return {
				name: { type: String },
				block: { type: String },
				modifier: { type: String },
				tag: { type: String },
				text: { type: String },
				bemObject: { type: Object },
				bemClassMap: { type: Object }
			};
		}
		constructor() {
			super();
			this.bemObject = Object.freeze({
				block:'',
				element:'',
				modifier:''
			});
			this.block = 'heading';
			this.bemClassMap = bemMap(this.getBemAttributes(), {
				'highlight': false,
				'hidden': false
			});
		}
		getBemAttributes(attrs) {
			const o = Object.assign({},this.bemObject);
			Object.keys(o).forEach(n => o[n] = (this.getAttribute(n) || this[n] || '').trim());
			return o;
		}
		render() {
			this.shadowRoot.adoptedStyleSheets = [shadowStyles];
			return html`<h1 class="${classMap(this.bemClassMap)}"><slot name="default">${this.text}</slot></h1>`;
		}
	}
);

