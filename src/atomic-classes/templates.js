import createFragment from 'createFragment';

const templateString = `
<section class="trvt-templates">
	<header class="trvt-templates__header"><slot name="header"></slot></header>
	<div class="trvt-templates__body"><slot name="content"></slot></div>
	<footer class="trvt-templates__footer"><slot name="footer"></slot></footer>
</section>
`;

export class templates extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.templateString = templateString;
		this.template = createFragment(this.templateString);
	}
}

