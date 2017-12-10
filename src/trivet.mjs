import { loadScript, loadStyles } from "./loader.mjs";


/* config default */

const defaults = {
	hookAttr = "data-component",
	basePath = "/"
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
const loadComponent = (elem, config) => {


};
/**
 * Look for all hooks and trigger
 * @param config
 */
const trivet = function(config = {}){
	
	getElementsByAttribute(hookAttr).forEach( elem => {
		setTimeout(() => loadComponent(elem, Object.assign(defaults, config),0);
	});
	
};



