const FormMixin = (superClass) =>
	class extends superClass {
		#internals;
		#shadowRoot;
		#value;
		#defaultValue;

		static formAssociated = true;
		get shadow() {
			return this.#shadowRoot;
		}

		get value() {
			return this.#value;
		}
		set value(v) {
			this.#value = v;
			this.#internals.setFormValue(this.#value);
		}

		get form() {
			return this.#internals.form;
		}
		get name() {
			return this.getAttribute('name');
		}
		get elementName() {
			return this.localName;
		}
		get formElement() {
			return this.#shadowRoot.querySelector('input, button, textarea');
		}
		get isSubmit() {
			return (
				this.formElement.hasAttribute('type') &&
				this.formElement.getAttribute('type') === 'submit'
			);
		}
		get validity() {
			return this.#internals.validity;
		}
		get validationMessage() {
			return this.#internals.validationMessage;
		}
		get willValidate() {
			return this.#internals.willValidate;
		}

		checkValidity() {
			return this.#internals.checkValidity();
		}
		reportValidity() {
			return this.#internals.reportValidity();
		}
		formDataToJSON(data) {
			const object = {};
			data.forEach(function (value, key) {
				object[key] = value;
			});
			return JSON.stringify(object);
		}
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
					this.formElement.disabled = newValue === 'true';
					break;
				case 'data-trvt-readonly':
					this.formElement.readonly = newValue === 'true';
					break;
			}
		}
		#setContextStyle() {
			this.contextCSS.replaceSync(`
				@layer components.modifier {
					button {
						--_context: var(--_context-${this.trvtContext});
					}
				}
			`);
		}

		constructor(...args) {
			super(...args);
			this.#shadowRoot = this.attachShadow({
				mode: 'closed',
				delegatesFocus: true,
			});
			this.#internals = this.attachInternals();
			this.#value = '';
			this.#defaultValue = '';
		}
	};

export { FormMixin };
