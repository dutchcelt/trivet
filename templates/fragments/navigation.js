module.exports = data => {
	
	const hrefs = data.map(h => h.replace(/\.js$/,'.html'));
	const linkTexts = data.map(h => h.split('/').pop().replace(/(\w+)\.js$/ig,'$1'));

	const links = data.reduce((a,c,i) => a + `<a href="/${hrefs[i]}" class="navigation__link">${linkTexts[i]}</a> `, '');
	
	return `<nav class="navigation">${links}</nav>`;
	
};
