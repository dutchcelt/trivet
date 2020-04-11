import { Trivet, html, render } from 'Trivet';

class Elements extends Trivet {
	constructor() {
		super();
		this.contentString = this.getAttribute('text');
		this.tag = this.getAttribute('tag') || 'p';
		this.attrs = [...this.attributes].filter(a => !(/text|tag/ig).test(a.name));
	}
}
export { Elements, html, render }

