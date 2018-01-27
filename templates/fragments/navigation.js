const path = require('path');

module.exports = data => {
	
	const linkObject = data.map(o => {
		return {
			root: '/',
			dir: o.dir.replace(process.cwd() + '/templates/content',''),
			name: o.name,
			ext: '.html'
		}
	});

	const links = linkObject.reduce((a,c) => a + `<a href="${path.format(c)}" class="navigation__link">${c.name}</a>`,'');
	
	return `<nav class="navigation">${links}</nav>`;
	
};
