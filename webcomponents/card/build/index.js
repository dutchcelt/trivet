import { TrivetElement as t } from '@trvt/core';
import e from './styles-f85e4d53.css' assert { type: 'css' };
class s extends t {
	constructor() {
		super(),
			(this.shadowStyleSheets = [e]),
			(this.template = this.contentTemplate());
	}
	contentTemplate() {
		return '\n\t\t\t<article>\n\t\t\t\t<slot name="heading"></slot>\n\t\t\t\t<slot name="intro"></slot>\n\t\t\t\t<slot name="content"></slot>\n\t\t\t\t<slot name="footer"></slot>\n\t\t\t\t<slot></slot>\n\t\t\t</article>\n\t\t';
	}
}
customElements.define('trvt-card', s);
export { s as TrvtCard };
