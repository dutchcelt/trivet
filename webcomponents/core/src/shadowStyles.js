import { templateShadowPolyfill } from './polyfills.js';
import { adoptStyles } from './adoptStyles.js';

export class ShadowStyles {
	constructor(settings) {
		const { element, styles, declarativeShadow = false } = settings;
		declarativeShadow || templateShadowPolyfill(element);
		this.stylesList = new Set();
		this.host = element;
		this.styles = styles;
	}
	#setStyles(shadow, rules, list) {
		rules.forEach((s) => list.add(s));
		adoptStyles(shadow, [...list]);
	}
	get element() {
		return this.host;
	}
	set element(element) {
		this.host = element;
	}
	get shadow() {
		return this.element.shadowRoot;
	}
	get styles() {
		return this.stylesList;
	}
	set styles(rules) {
		this.#setStyles(this.shadow, rules, this.stylesList);
	}
}
