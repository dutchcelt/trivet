const sanitizeThis = (str) => {
	const el = document.createElement('div');
	el.innerText = str;
	return el.innerHTML;
}

class EventDataBus {
	constructor() {
		this._bus = document.createElement('div');
		this.data =  {};
	}
	_storeDetail(name, detail = {}){
		detail = this._safeValues(detail);
		this.data[name]
			? Object.assign(this.data[name].detail, detail)
			: this.data[name] = { detail };
		return this.data[name];
	}
	_retrieveDetail(name) {
		return this.data[name] && this.data[name].detail;
	}
	_safeValues(detail){
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
	register(event, callback) {
		this._bus.addEventListener(event, callback);
	}
	remove(event, callback) {
		this._bus.removeEventListener(event, callback);
		delete this.data[event];
	}
	fire(event, detail = {}) {
		const eventDetail = this._storeDetail(event, detail);
		this._bus.dispatchEvent(new CustomEvent(event, eventDetail));
	}
	addDetail(name, detail) {
		this._storeDetail(name, detail);
	}
	getDetail(name, property) {
		const detail = this._retrieveDetail(name);
		return detail && property ? detail[property] : detail;
	}
}

const dataBus = new EventDataBus();
export { dataBus }
