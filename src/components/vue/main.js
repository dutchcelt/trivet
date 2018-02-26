import template from './template.js';

export default async target => {
	
	new Vue({
		el: target,
		template: template,
		data: {
			message: 'Hello Vue!',
			active: 'home',
			pages: [
				{name: 'Home'},
				{name:'Projects'},
				{name:'Services'},
				{name:'Contact'}
			]
			
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


