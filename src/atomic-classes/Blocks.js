import { Compositions } from 'Compositions';
import createFragment from 'createFragment';


export class Blocks extends Compositions {
	constructor() {
		super();
		this.template = createFragment(this.templateString);
	}
}

