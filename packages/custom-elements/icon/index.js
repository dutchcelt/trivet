import { TrivetElement, createFragment } from '@trvt/core';
import { getIconFromStore } from '@trvt/assets/iconStore.js';
function toPascalCase(str) {
	return str
		.split(/\W|_|-/)
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join('');
}

export class TrvtIcon extends TrivetElement {
	/** @constructor */
	constructor() {
		super();
		this.iconName = this.getAttribute('icon-name');
		this.moduleName = `icon${toPascalCase(this.iconName)}`;
		this.shadow.append(createFragment(getIconFromStore(this.moduleName)));
	}
}

customElements.define('trvt-icon', TrvtIcon);
