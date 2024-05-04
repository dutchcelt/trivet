import { trvtRowGroup } from './index.js';

export class trvtThead extends trvtRowGroup {
	constructor() {
		super();
	}
}
customElements.define('trvt-thead', trvtThead);
