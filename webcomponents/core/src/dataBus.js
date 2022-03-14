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

const createEventObject = (store,event,props) => {
	Object.defineProperty(store, event,{
		enumerable: false,
		configurable: true,
		writable: true,
		value:{
			data:{...props},
			get detail(){
				return this.data;
			}
		}
	})
}

/**
 * @class EventDataBus
 * Event bus with data store based on registered events
 */
class EventDataBus {

	constructor() {
		this._bus = document.createElement('div');
		this.store = {};
	}
	/**
	 * Register custom event
	 * @param {string} event
	 * @param callback
	 */
	register(event, callback) {
		const eventName = event || 'anonymous';
		if(this[eventName]) {
			console.warn(`Can't register event '${eventName}' because it already exists.`);
		} else {
			createEventObject(this,eventName);
			this._bus.addEventListener(eventName, callback);
		}
	}

	/**
	 * Removed custom event
	 * @param {string} event
	 * @param callback
	 */
	remove(event, callback) {
		this[event]
			? this._bus.removeEventListener(event, callback)
			: console.warn(`Can't remove event '${event}' because it hasn't been registered.`);
	}

	/**
	 * trigger custom event with 'detail' payload
	 * @param {string} event
	 * @param {Object} [detail={}]
	 */
	fire(event, detail = {}) {
		if(this[event]) {
			detail = Object.assign(this[event].data, safeValues(detail));
			this._bus.dispatchEvent(new CustomEvent(event, {detail}));
		} else {
			console.warn(`Can't fire event '${event}' because it hasn't been registered.`);
		}
	}
}

const dataBus = new EventDataBus();
export { dataBus }
