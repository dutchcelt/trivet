const script = document.querySelector('[data-trvt-components]');
if (script) {
	const packageList = script.dataset?.trvtComponents?.split(',');
	const packageNames = packageList.map((pkg) =>
		pkg.substring(1).replace('/', '-')
	);
	const allElements = document.getElementsByTagName('*');
	const trivetElements = [...allElements].filter(
		(node) =>
			/trvt-\w+/i.test(node.tagName) &&
			packageNames.includes(node.tagName.toLowerCase())
	);
	const trivetElementNames = [
		...new Set(trivetElements.map((e) => e.tagName.toLowerCase())),
	];

	trivetElementNames.forEach((name) => {
		const moduleName = `../@${name.replace('-', '/')}/index.js`;
		//import(moduleName);
	});
}
//console.log(trivetElementNames);
