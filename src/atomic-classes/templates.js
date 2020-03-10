import { Atomic } from 'atomic';
import createFragment from 'createFragment';

const templateString = `
<section class="trvt-section">
	<header class="trvt-section__header"><slot name="header"></slot></header>
	<div class="trvt-section__body"><slot name="content"></slot></div>
	<footer class="trvt-section__footer"><slot name="footer"></slot></footer>
</section>
`;

export class templates extends Atomic {
	constructor() {
		super();
		this.templateString = templateString;
		this.template = createFragment(this.templateString);


	}
}

