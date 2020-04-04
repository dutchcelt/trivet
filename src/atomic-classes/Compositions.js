
import { Trivet } from 'Trivet';
import createFragment from 'createFragment';

const templateString = `
	<slot name="navigation"></slot>
	<slot name="header"></slot>
	<slot name="content"></slot>
	<slot name="footer"></slot>
`;

export class Compositions extends Trivet {
	constructor() {
		super();
		this.templateString = templateString;
		this.template = createFragment(this.templateString);
	}
}

