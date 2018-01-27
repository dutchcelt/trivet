module.exports = data => {
	
	const navObject = data.map(o => {
		return {
			href: o.dir.replace(process.cwd() + '/templates/content','') + '/' + o.name + '.html',
			name: o.name
		}
	});

	const links = navObject.reduce((a,c) => a + `<a href="${c.href}" class="navigation__link">${c.name}</a>`, '');
	
	return `<nav class="navigation">${links}</nav>`;
	
};
