import {loadModule, loadStyles, loadJSON, normalisePath, loaderSet} from "./utils/loader.js";

/* config default */
const defaults = {};
defaults.name = 'trivet';
defaults.hookAttr = 'data-' + defaults.name;
defaults.basePath = '/';

// Add response to each loaded file
const loaderMap = new Map();

document.styleSheets[0].insertRule(`[${defaults.hookAttr}] { display:none !important; }`, 1);

const elements = document.body.getElementsByTagName('*');

const getElementsByAttribute = attr => {
	const arr = [];
	for (let i = elements.length; i--;) {
		elements[i].hasAttribute(attr) && arr.push(elements[i]);
	}
	return arr;
};


const ResolveLoader = {
	
	functionMap: {
		'js': loadModule,
		'css': loadStyles,
		'json': loadJSON
	},
	
	getLoadFunction() {
		const ext = /[\.|#](\w+)$/ig.exec(this.filepath).pop();
		return this.functionMap[ext](this.filepath);
	},
	
	getLoaderObject() {
		const o = loaderMap.get(this.filepath);
		return Promise.resolve(typeof o === 'function' ? o() : o);
	},
	
	get deferred() {
		return loaderSet.has(this.filepath)
			? this.getLoaderObject()
			: this.getLoadFunction();
	}
};


/**
 * Loads a components defined the config module by matching the corresponding hook.
 * A component consists of a single script that may optionally be paired with a stylesheet and or template.
 * @param {Element} elem
 * @param {Object} settings
 */
const loadTrivet = (elem, settings) => {
	
	if (!settings || !settings.paths) return;
	const key = elem.dataset[settings.name];
	
	const loader = array => {
		const loaders = [];
		array.forEach(file => {
			const href = /^http/ig.test(file) ? file : normalisePath(`${settings.basePath}/${key}/${file}`);
			const url = new URL(href);
			const filepath = url.origin + url.pathname;
			const resolveLoader = Object.create(ResolveLoader, { filepath: { value: filepath } });
			loaders.push(resolveLoader.deferred);
			
		});
		return Promise.all(loaders);
		
	};
	
	/**
	 * Last load cycle that will remove the style attribute
	 */
	loader(settings.paths[key]).then(responses => {
		let fn, data;
		responses.forEach(r => {
			if (!r || r instanceof Event) return;
			if (r.default && typeof r.default === 'function') {
				fn = fn || r.default;
			} else if (typeof r === 'object') {
				data = r;
			}
		});
		fn && fn(elem, data);
		elem.removeAttribute(settings.hookAttr);
	});
	
};


/**
 * Look for all hooks and trigger
 * @param {object} opts
 */
const trivet = function (opts = {}) {
	loadJSON(`/${defaults.name}.json`).then(json => {
		const settings = Object.create(defaults);
		Object.assign(settings, json, opts);
		
		getElementsByAttribute(settings.hookAttr).forEach(elem => {
			setImmediate(loadTrivet, elem, settings);
		});
		
	});
	
};


(/d$|^i|^c/).test(document.readyState) ? setImmediate(trivet) : document.addEventListener('DOMContentLoaded', trivet);


export {trivet as default, elements};
