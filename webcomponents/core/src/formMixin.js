const TrvtFormMixin = (superClass) =>
	class extends superClass {
		#internals;
		#shadowRoot;
		#value;

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
		get type() {
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

		constructor(...args) {
			super(...args);
			this.#shadowRoot = this.attachShadow({
				mode: 'closed',
				delegatesFocus: true,
			});
			this.#internals = this.attachInternals();
			this.#value = '';
		}
	};

export { TrvtFormMixin };
