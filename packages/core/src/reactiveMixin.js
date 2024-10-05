/**
 * ReactiveMixin
 * @param {Object} superClass
 */
const ReactiveMixin = superClass =>
	class extends superClass {
		/**
		 * attributeChangedCallback
		 * @param {Array} args
		 */
		attributeChangedCallback(...args) {
			const [name, oldValue, newValue] = args;
			if (oldValue !== null && oldValue === newValue) return;
			switch (name) {
				case 'data-context':
					this.trvtContext = newValue;
					this.#setContextStyle();
					break;
				case 'data-disabled':
					this.shadowFragment.disabled = newValue === 'true';
					break;
				case 'data-readonly':
					this.shadowFragment.readonly = newValue === 'true';
					break;
			}
		}
		#setContextStyle() {
			const tag = this.shadowFragment.tagName.toLowerCase();
			this.contextCSS.replaceSync(`
				@layer components.modifier {
					${tag} {
						--_context: var(--_context-${this.trvtContext});
					}
				}
			`);
		}
		connectedCallback() {
			this.shadowStyleSheets = this.contextCSS;
		}
		/**
		 * @param {Array} args
		 */
		constructor(...args) {
			super(...args);
			this.contextCSS = new CSSStyleSheet();
		}
	};

export { ReactiveMixin };
