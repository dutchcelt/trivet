import { TrivetElement as t } from '@trvt/core';
import s from './styles-f85e4d53.css' assert { type: 'css' };
class e extends t {
	constructor() {
		super(),
			(this.shadowStyleSheets = [s]),
			(this.template =
				'\n\t<article>\n\t\t<slot name="heading"></slot>\n\t\t<slot name="intro"></slot>\n\t\t<slot name="content"></slot>\n\t\t<slot name="footer"></slot>\n\t\t<slot></slot>\n\t</article>\n');
	}
}
customElements.define('trvt-card', e);
export { e as TrvtCard };
