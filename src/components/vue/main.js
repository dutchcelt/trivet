import insertTemplate from '/utils/insertTemplate.js';
import template from './template.js';

export default async target => {
	
	insertTemplate(template, target);
	
	const app = new Vue({
		el: target,
		data: {
			message: 'Hello Vue!'
		}
	});
};


