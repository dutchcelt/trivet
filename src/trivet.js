import { loadScript, loadStyles } from "./utils/loader.js";


/* config default */

let defaults = {
	"hookAttr": "data-trivet",
	"basePath": "/"
};
const elements = document.body.getElementsByTagName('*');

const getElementsByAttribute = attr => {
	const arr = [];
	for (let i = elements.length; i--; ) {
		elements[i].hasAttribute(attr) && arr.push(elements[i]);
	}
	return arr;
};

/**
 * Loads a components defined the config module by matching the corresponding hook.
 * A component consists of a single script that may optionally be paired with a stylesheet and or template.
 */
const loadTrivet = (elem, settings) => {
	console.log(settings, elem.getAttribute(settings.hookAttr));

};
/**
 * Look for all hooks and trigger
 * @param {object} opts
 */
const trivet = async function(opts = {}){
	let rc = {};
	try {
		rc = await fetch('/trivet.json').then(r => r.json());
	} catch (e) {}
	const settings = Object.assign(defaults, rc, opts);
	
	getElementsByAttribute(settings.hookAttr).forEach( elem => {
		setTimeout(() => loadTrivet(elem, settings),0);
	});
	
};



trivet();
