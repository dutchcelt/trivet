/* Base styles for all Trivet Components */
import { trivetCSS } from '@trvt/assets';
import { createFragment } from './createFragment.js';

class TrivetElement extends HTMLElement {
	#shadowRoot;
	#shadowStyles;
	#template;

	#render() {
		this.#shadowRoot.innerHTML = this.template;
	}

	get shadow() {
		return this.#shadowRoot;
	}
	get shadowElement() {
		return this.formElement || this.#shadowRoot.querySelector('*');
	}

	get shadowStyleSheets() {
		return this.#shadowStyles;
	}
	set shadowStyleSheets(styles) {
		const sheets = [styles].flat();
		this.#shadowRoot.adoptedStyleSheets.push(...sheets);
	}

	get template() {
		return this.#template;
	}
	set template(str) {
		this.#template = createFragment(str, false);
		this.#render();
	}

	constructor() {
		super();
		this.settings = {
			mode: 'closed',
			delegatesFocus: true,
		};
		this.#shadowRoot = this.attachShadow({ ...this.settings });
		this.shadowStyleSheets = [...trivetCSS];
		this.#template = ``;
	}
}
export { trivetCSS as styles, TrivetElement };
