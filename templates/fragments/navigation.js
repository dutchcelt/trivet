module.exports = data => {

	const links = data.reduce((a,c) => a + `<a href="${c}" class="navigation__link">${c}</a>`, '');
	
	return `<nav class="navigation">${links}</nav>`;
	
};
