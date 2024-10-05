import { TrivetElement } from '@trvt/core';
import { getIconFromStore } from '@trvt/assets/iconStore.js';
import iconCSS from './index.css' with { type: 'css' };

function toPascalCase(str = '') {
	return str
		.split(/\W|_|-/)
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join('');
}

export class TrvtIcon extends TrivetElement {
	#modulename;
	#icon;

	/** @constructor */
	constructor() {
		super();
		this.icon = this.getAttribute('icon-name');
		this.shadow.append(this.icon);
		/** @type {CSSStyleSheet[]} */
		this.shadowStyleSheets = iconCSS;
	}

	get icon() {
		return this.#icon;
	}
	set icon(iconName) {
		this.moduleName = iconName;
		this.#icon = getIconFromStore(this.moduleName);
	}
	get moduleName() {
		return this.#modulename;
	}
	set moduleName(iconName) {
		this.#modulename = `icon${toPascalCase(iconName)}`;
	}

	static observedAttributes = ['icon-name', 'icon-color', 'icon-size'];

	attributeChangedCallback(name, oldValue, newValue) {
		if (!newValue) return;
		const oldIcon = this.icon;
		switch (name) {
			case 'icon-name':
				this.icon = newValue;
				this.shadow.replaceChild(this.icon, oldIcon);
				break;
			case 'icon-color':
				this.shadowCSSvars = `--trvt-icon-color: ${newValue}`;
				break;
			case 'icon-size':
				this.shadowCSSvars = `--trvt-icon-size: ${newValue}`;
				break;
			default:
				console.info('No matching attribute to act on.');
		}
	}
}

customElements.define('trvt-icon', TrvtIcon);
