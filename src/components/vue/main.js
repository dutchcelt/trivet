import template from './template.js';
import { loadScript } from '/utils/loader.js';

export default async (target, data) => {

	await loadScript(data.vuejs);
	
	new Vue({
		el: target,
		template: template,
		data: {
			message: 'Hello Vue!',
			active: 'home',
			pages: data.pages
		},
		
		// Functions we will be using.
		methods: {
			makeActive: function(item, event){
				const active = event.target.closest('nav').querySelector('.active');
				active && active.classList.remove('active');
				event.target.classList.add('active');
				this.active = item.name;
			}
		}
	});
	
};


