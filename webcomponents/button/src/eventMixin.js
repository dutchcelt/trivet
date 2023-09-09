const isKeyboardClickEvent = (event) =>
	event.key === ' ' || event.key === 'Enter';
const isSpaceKeyboardClickEvent = (event) => event.key === ' ';

const EventMixin = (superClass) =>
	class extends superClass {
		/**
		 * @private
		 */
		#clickHandler(event) {
			/* `isSubmit` and `formElement` are mixed in via `formMixin.js` */
			if (
				!this.formElement.readonly &&
				!this.formElement.disabled &&
				this.isSubmit
			) {
				this.form.submit();
			}
		}

		/**
		 * @private
		 */
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
		 * @private
		 */
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
			const keyupHandler = (keyupEvent) => {
				if (isKeyboardClickEvent(keyupEvent)) {
					this.active = false;
					document.removeEventListener('keyup', keyupHandler, true);
				}
			};
			document.addEventListener('keyup', keyupHandler, true);
		}
		/**
		 * @param {KeyboardEvent} event
		 * @private
		 */
		#keyupHandler(event) {
			isKeyboardClickEvent(event) && this.#clickHandler(event);
		}

		constructor(...args) {
			super(...args);
			this.addEventListener('click', (event) =>
				this.#clickHandler(event)
			);
			this.addEventListener('mousedown', this.#mousedownHandler);
			this.addEventListener('keydown', this.#keydownHandler);
			this.addEventListener('keyup', this.#keyupHandler);
		}
	};
export { EventMixin };