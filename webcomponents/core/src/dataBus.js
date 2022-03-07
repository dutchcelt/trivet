class EventDataBus {
	constructor() {
		this._bus = document.createElement('div');
		this.data =  {};
	}
	_storeDetail(name, detail = {}){
		this.data[name]
			? Object.assign(this.data[name].detail, detail)
			: this.data[name] = { detail };
		return this.data[name];
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
		const detail = this._storeDetail(name).detail;
		return detail && property ? detail[property] : detail;
	}
}

const dataBus = new EventDataBus();
export { dataBus }
