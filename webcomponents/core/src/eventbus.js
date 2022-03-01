class EventBus {
	constructor() {
		this._bus = document.createElement('div');
	}

	register(event, callback) {
		this._bus.addEventListener(event, callback);
	}

	remove(event, callback) {
		this._bus.removeEventListener(event, callback);
	}
	fire(event, detail = {}) {
		this._bus.dispatchEvent(new CustomEvent(event, { detail }));
	}
}
const bus = new EventBus();
export { bus };
