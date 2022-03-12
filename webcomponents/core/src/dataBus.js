// @ts-check

/**
 * Basic conversion of string entities
 * @param {string} str
 * @returns {string}
 */
const sanitizeThis = (str) => {
	const el = document.createElement('div');
	el.innerText = str;
	return el.innerHTML;
}
/**
 * Restrict the type of values used and sanitize string input
 * @param {Object} detail
 * @returns {Object}
 */
const safeValues = (detail) => {
	const cleanDetail = {};
	for (const [key, value] of Object.entries(detail)) {
		const propType = typeof detail[key];
		const safeType = (/string|boolean|number/).test(propType)
		if (safeType) {
			cleanDetail[key] = propType === 'string' ? sanitizeThis(value) : value;
		} else {
			console.warn(`Trivet: Detail property '${key}' of type '${propType}' is prohibited and has been removed`);
		}
	}
	return cleanDetail;
}

/**
 * @class EventDataBus
 * Event bus with data store based on registered events
 */
class EventDataBus {
	constructor() {
		this._bus = document.createElement('div');
		this.store = {
			detail: undefined,
			event: undefined,
			get [this.event]() {
				return this.detail;
			},
			set [this.event](data){
				this.detail = { ...this.detail, ...safeValues(data.detail) };
			}
		}
	}

	/**
	 * Register custom event
	 * @param {string} event
	 * @param callback
	 */
	register(event, callback) {
		if (this.store[event] === undefined) this.store[event] = { event };
		this._bus.addEventListener(event, callback);
	}

	/**
	 * Removed custom event
	 * @param {string} event
	 * @param callback
	 */
	remove(event, callback) {
		this._bus.removeEventListener(event, callback);
		delete this.store[event];
	}

	/**
	 * trigger custom event with 'detail' payload
	 * @param {string} event
	 * @param {Object} [detail={}]
	 */
	fire(event, detail = {}) {
		this.store[event] = {detail};
		this._bus.dispatchEvent(new CustomEvent(event, this.store[event]));
	}

	/**
	 * Added data to an event payload. Can be used autonomously.
	 * @param {string} event
	 * @param {Object} detail
	 */
	addDetail(event, detail) {
		if (this.store[event] === undefined) this.store[event] = { event };
		this.store[event] = {detail} ;
	}

	/**
	 * Get the detail object from an existing event payload.
	 * @param {string} event
	 * @param {string} property
	 * @returns {Object}
	 */
	getDetail(event, property) {
		const detail = this.store.hasOwnProperty(event) && this.store[event].detail;
		return detail && property ? detail[property] : detail;
	}
}

const dataBus = new EventDataBus();
export { dataBus }
