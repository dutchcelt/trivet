/**
 * Checks if the given event is a keyboard click event.
 *
 * @param {KeyboardEvent} event - The event object to check.
 * @returns {boolean} Returns true if the event is a keyboard click event, otherwise false.
 */
const isKeyboardClickEvent = event =>
	event.key === ' ' || event.key === 'Enter';

/**
 * @param {KeyboardEvent} event
 * @returns {boolean}
 */
const isSpaceKeyboardClickEvent = event => event.key === ' ';

// @ts-expect-error
const EventMixin = superClass =>
	class extends superClass {
		#clickHandler() {
			/* `isSubmit` and `formElement` are mixed in via `formMixin.js` */
			if (
				!this.formElement.readonly &&
				!this.formElement.disabled &&
				this.isSubmit
			) {
				this.form.submit();
			}
		}

		#mousedownHandler() {
			this.active = true;
			const mouseupHandler = () => {
				this.active = false;
				document.removeEventListener('mouseup', mouseupHandler);
				this.removeEventListener('mouseup', mouseupHandler);
			};
			document.addEventListener('mouseup', mouseupHandler);
			this.addEventListener('mouseup', mouseupHandler);
		}
		/**
		 * @param {KeyboardEvent} event
\		 */
		#keydownHandler(event) {
			if (this.active || !isKeyboardClickEvent(event)) {
				if (isSpaceKeyboardClickEvent(event)) {
					event.preventDefault();
				}
				return;
			}
			if (isSpaceKeyboardClickEvent(event)) {
				event.preventDefault();
			}
			this.active = true;
			/**
			 * @param {KeyboardEvent} keyupEvent
			 */
			const keyupHandler = keyupEvent => {
				if (isKeyboardClickEvent(keyupEvent)) {
					this.active = false;
					document.removeEventListener('keyup', keyupHandler, true);
				}
			};
			document.addEventListener('keyup', keyupHandler, true);
		}
		/**
		 * @param {KeyboardEvent} event
		 */
		#keyupHandler(event) {
			isKeyboardClickEvent(event) && this.#clickHandler();
		}

		/**
		 * Creates a new instance of the Constructor class.
		 *
		 * @param {...any} args - Any number of arguments.
		 */
		constructor(...args) {
			super(...args);
			this.addEventListener('click', () => this.#clickHandler());
			this.addEventListener('mousedown', this.#mousedownHandler);
			this.addEventListener('keydown', this.#keydownHandler);
			this.addEventListener('keyup', this.#keyupHandler);
		}
	};
export { EventMixin };
