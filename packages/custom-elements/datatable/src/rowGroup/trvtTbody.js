import { trvtRowGroup } from './index.js';

export class trvtTbody extends trvtRowGroup {
	constructor() {
		super();
	}
}
customElements.define('trvt-tbody', trvtTbody);
