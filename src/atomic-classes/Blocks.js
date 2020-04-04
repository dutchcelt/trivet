import { Compositions } from 'Compositions';
import createFragment from 'createFragment';

const templateString = `
	<slot name="header"></slot>
	<slot name="content"></slot>
	<slot name="footer"></slot>
`;

export class Blocks extends Compositions {
	constructor() {
		super();
		this.templateString = templateString;
		this.template = createFragment(this.templateString);
	}
}

