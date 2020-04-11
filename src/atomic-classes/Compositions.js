import { Trivet, html, render } from 'Trivet';

const template = () => html`
	<slot name="header"></slot>
	<slot name="content"></slot>
	<slot name="footer"></slot>
`;

class Compositions extends Trivet {
	constructor() {
		super();
		this.tag = 'div';
		this.template = template;
	}
}

export { Compositions, html, render }
