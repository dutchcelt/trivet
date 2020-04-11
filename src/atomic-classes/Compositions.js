import { Trivet, html, render } from 'Trivet';

const template = () => html`
	<slot name="navigation"></slot>
	<slot name="header"></slot>
	<slot name="content"></slot>
	<slot name="footer"></slot>
`;

class Compositions extends Trivet {
	constructor() {
		super();
		this.template = template;
	}
}

export { Compositions, html, render }
