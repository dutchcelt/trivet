import { Blocks } from 'Blocks';


/**
 * Atomic design Atoms class
 */
export class Elements extends Blocks {
	constructor() {
		super();
		this.contentString = this.getAttribute('text');
		this.tag = this.getAttribute('tag') || 'p';
		this.attrs = [...this.attributes].filter(a => !(/text|tag/ig).test(a.name));
	}
}


