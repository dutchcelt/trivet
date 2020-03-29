import { Atomic } from 'Atomic';
import createFragment from 'createFragment';

const templateString = `
	<slot name="navigation"></slot>
	<slot name="header"></slot>
	<slot name="content"></slot>
	<slot name="footer"></slot>
`;

export class Pages extends Atomic {
	constructor() {
		super();
		this.templateString = templateString;
		this.template = createFragment(this.templateString);


	}
}

