import { styles as t } from '@trvt/core';
import r from './dropdown.css';
class e extends HTMLElement {
	constructor() {
		super(), (this.block = 'dropdown');
	}
	static styles = [...t, r];
	static get properties() {
		return { menu: { type: Array } };
	}
}
customElements.define('trvt-dropdown', e);
export { e as TrvtDropdown };
