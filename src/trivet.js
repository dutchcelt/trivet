import { loadJSON } from "./utils/loader.js";

/* config default */
const defaults = {};
defaults.name = 'trivet';
defaults.hookAttr = 'data-' + defaults.name;
defaults.basePath = '/';

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
 * @param {Element} elem
 * @param {Object} settings
 */
const loadTrivet = async (elem, settings) => {
	const key = elem.dataset[defaults.name];
	if (settings.paths[key]) {
		try {
			const func = await import(`${settings.basePath}/${key}/${settings.paths[key]}`);
			func.default(elem);
		} catch (error){
			console.warn(error);
		}
	} else {
		console.warn(`The loader doesn't recognize "${key}" in it's config paths setting.`);
	}
};


/**
 * Look for all hooks and trigger
 * @param {object} opts
 */
const trivet = async function(opts = {}){
	const rc = await loadJSON('/trivet.json');
	const settings = Object.create(defaults);
	Object.assign(settings,rc, opts);
	
	getElementsByAttribute(settings.hookAttr).forEach( elem => {
		setImmediate(loadTrivet, elem, settings);
	});
	
};


trivet();

export { trivet as default, elements };
