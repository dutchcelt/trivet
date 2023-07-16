const ReactiveMixin = (superClass) =>
	class extends superClass {
		/**
		 * attributeChangedCallback
		 * @param {Array} args
		 */
		attributeChangedCallback(...args) {
			const [name, oldValue, newValue] = args;
			if (oldValue !== null && oldValue === newValue) return;
			switch (name) {
				case 'data-trvt-context':
					this.trvtContext = newValue;
					this.#setContextStyle();
					break;
				case 'data-trvt-disabled':
					this.shadowElement.disabled = newValue === 'true';
					break;
				case 'data-trvt-readonly':
					this.shadowElement.readonly = newValue === 'true';
					break;
			}
		}
		#setContextStyle() {
			const tag = this.shadowElement.tagName.toLowerCase();
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
		constructor(...args) {
			super(...args);
			this.contextCSS = new CSSStyleSheet();
		}
	};

export { ReactiveMixin };
