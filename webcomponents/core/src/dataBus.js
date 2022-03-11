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
 * Create a reactive store object for the event details
 * @param {string} name
 * @returns {Object} {{detail: {}}}
 */
const createStoreObject = (name) => Object.defineProperty({detail: {}}, name, {
	get() {
		return this.detail;
	},
	set(event) {
		Object.assign(this.detail, safeValues(event.detail))
	}
});

/**
 * @class EventDataBus
 * Event bus with data store based on registered events
 */
class EventDataBus {
	constructor() {
		this._bus = document.createElement('div');
		this.data =  {};
	}

	/**
	 * Register custom event
	 * @param {string} event
	 * @param callback
	 */
	register(event, callback) {
		if (this.data[event] === undefined) this.data[event] = createStoreObject(event);
		this._bus.addEventListener(event, callback);
	}

	/**
	 * Removed custom event
	 * @param {string} event
	 * @param callback
	 */
	remove(event, callback) {
		this._bus.removeEventListener(event, callback);
		delete this.data[event];
	}

	/**
	 * trigger custom event with 'detail' payload
	 * @param {string} event
	 * @param {Object} [detail={}]
	 */
	fire(event, detail = {}) {
		if( detail ) this.data[event] = { detail };
		this._bus.dispatchEvent(new CustomEvent(event, this.data[event]));
	}

	/**
	 * Added data to an event payload. Can be used autonomously.
	 * @param {string} event
	 * @param {Object} detail
	 */
	addDetail(event, detail) {
		if (this.data.hasOwnProperty(event)) this.data[event] = { detail };
	}

	/**
	 * Get the detail object from an existing event payload.
	 * @param {string} event
	 * @param {string} property
	 * @returns {Object}
	 */
	getDetail(event, property) {
		const detail = this.data.hasOwnProperty(event) && this.data[event].detail;
		return detail && property ? detail[property] : detail;
	}
}

const dataBus = new EventDataBus();
export { dataBus }
