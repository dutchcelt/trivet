import { Atomic } from 'Atomic';
import createFragment from 'createFragment';

const templateString = `
<div class="trvt-pages">
	<header class="trvt-pages__header"><slot name="header"></slot></header>
	<main class="trvt-pages__main"><slot name="main"></slot></main>
	<footer class="trvt-pages__footer"><slot name="footer"></slot></footer>
</div>
`;

export class Pages extends Atomic {
	constructor() {
		super();
		this.templateString = templateString;
		this.template = createFragment(this.templateString);


	}
}

