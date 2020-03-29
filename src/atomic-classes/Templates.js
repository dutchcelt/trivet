import { Atomic } from 'Atomic';
import createFragment from 'createFragment';

const templateString = `
	<slot name="header"></slot>
	<slot name="content"></slot>
	<slot name="footer"></slot>
`;

export class Templates extends Atomic {
	constructor() {
		super();
		this.templateString = templateString;
		this.template = createFragment(this.templateString);
	}
}

