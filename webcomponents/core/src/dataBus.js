/**
 * Basic conversion of string entities
 * @param str
 * @returns {string}
 */
const sanitizeThis = (str) => {
	const el = document.createElement('div');
	el.innerText = str;
	return el.innerHTML;
}
/**
 * Restrict the type of values used and sanitize string input
 * @param detail
 * @returns {{}}
 */
const safeValues = (detail) => {
	const cleanDetail = {};
	for (const [key, value] of Object.entries(detail)) {
		const propType = typeof detail[key];
		const safeType = (/string|boolean|number/).test(propType)
		if (safeType) {
			cleanDetail[key] = safeType === 'string' ? sanitizeThis(value) : value;
		} else {
			console.warn(`Trivet: Detail property '${key}' of type '${propType}' is prohibited and has been removed`);
		}
	}
	return cleanDetail;
}

class EventDataBus {
	constructor() {
		this._bus = document.createElement('div');
		this.data =  {};
	}

	/**
	 * Compose data to allow reuse from multiple events
	 * @param name
	 * @param detail
	 * @returns {*}
	 * @private
	 */
	_storeDetail(name, detail = {}){
		detail = safeValues(detail);
		this.data[name]
			? Object.assign(this.data[name].detail, detail)
			: this.data[name] = { detail };
		return this.data[name];
	}

	/**
	 * get the Detail object associated from an event payload
	 * @param name
	 * @returns {*}
	 * @private
	 */
	_retrieveDetail(name) {
		return this.data[name] && this.data[name].detail;
	}

	/**
	 * Register custom event
	 * @param event
	 * @param callback
	 */
	register(event, callback) {
		this._bus.addEventListener(event, callback);
	}

	/**
	 * Removed custom event
	 * @param event
	 * @param callback
	 */
	remove(event, callback) {
		this._bus.removeEventListener(event, callback);
		delete this.data[event];
	}

	/**
	 * trigger custom event with 'detail' payload
	 * @param event
	 * @param detail
	 */
	fire(event, detail = {}) {
		const eventDetail = this._storeDetail(event, detail);
		this._bus.dispatchEvent(new CustomEvent(event, eventDetail));
	}

	/**
	 * Added data to an event payload. Can be used autonomously.
	 * @param name
	 * @param detail
	 */
	addDetail(name, detail) {
		this._storeDetail(name, detail);
	}

	/**
	 * Get the detail object from an existing event payload.
	 * @param name
	 * @param property
	 * @returns {*}
	 */
	getDetail(name, property) {
		const detail = this._retrieveDetail(name);
		return detail && property ? detail[property] : detail;
	}
}

const dataBus = new EventDataBus();
export { dataBus }
