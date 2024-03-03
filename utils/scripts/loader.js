// @ts-nocheck
// const meta = document.querySelector('meta[name=trvt-components]');
// console.log(meta.content, meta.hasAttribute('devmode'));
// if (meta) {
// 	const packageList = meta.content.split(',');
// 	const packageNames = packageList.map((pkg) =>
// 		pkg.substring(1).replace('/', '-')
// 	);
// 	const allElements = document.getElementsByTagName('*');
// 	const trivetElements = [...allElements].filter((node) =>
// 		/trvt-\w+-?\w?/i.test(node.tagName)
// 	);
// 	const trivetElementNames = [
// 		...new Set(trivetElements.map((e) => e.tagName.toLowerCase())),
// 	];
// 	console.log(trivetElements);
// 	packageList.forEach((pkg) => import(pkg));
// 	// trivetElementNames.forEach((name) => {
// 	// 	import(`@${name.replace('-', '/')}`);
// 	// });
// }
